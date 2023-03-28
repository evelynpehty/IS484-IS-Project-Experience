import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta


class StockData:
    def __init__(self, ticker, start_date, end_date):
        self._ticker = ticker
        self._start_date = start_date
        self._end_date = end_date
        self._stock_data = self.fetch_stock_data()
        self._m = None
        self._c = None
        self._std = None
        self._channel_upper = None
        self._channel_lower = None
        self._outer_upper = None
        self._outer_lower = None

    def fetch_stock_data(self):
        stock_data = yf.download(
            self._ticker, start=self._start_date, end=self._end_date
        )
        return stock_data

    def linear_regression(self):
        n = len(self.stock_data)
        x = np.arange(n)
        y = self.stock_data["Close"].values

        A = np.vstack([x, np.ones(n)]).T
        self._m, self._c = np.linalg.lstsq(A, y, rcond=None)[0]

    def calculate_std(self):
        x = np.arange(len(self.stock_data))
        y = self.stock_data["Close"].values
        y_pred = self._m * x + self._c
        self._std = np.std(y - y_pred)

    def calculate_channels(self):
        x = np.arange(len(self.stock_data))
        regression_line = self._m * x + self._c
        self._channel_upper = regression_line + self._std * 1
        self._channel_lower = regression_line - self._std * 1
        self._outer_upper = regression_line + self._std * 2
        self._outer_lower = regression_line - self._std * 2

    def plot_data_and_regression_lines(self):
        plt.figure(figsize=(12, 6))
        x = np.arange(len(self.stock_data))
        regression_line = self._m * x + self._c

        plt.plot(self.stock_data.index, self.stock_data["Close"], label="Close Price")
        plt.plot(
            self.stock_data.index,
            regression_line,
            label="Regression Line",
            color="red",
            linestyle="-",
        )
        plt.plot(
            self.stock_data.index,
            self._channel_upper,
            label="Upper Channel",
            color="green",
            linestyle="--",
        )
        plt.plot(
            self.stock_data.index,
            self._channel_lower,
            label="Lower Channel",
            color="green",
            linestyle="--",
        )
        plt.plot(
            self.stock_data.index,
            self._outer_upper,
            label="Outer Upper Line",
            color="blue",
            linestyle="--",
        )
        plt.plot(
            self.stock_data.index,
            self._outer_lower,
            label="Outer Lower Line",
            color="blue",
            linestyle="--",
        )

        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.title("Stock Price and Regression Lines")
        plt.legend()
        plt.show()

    # Getter and setter methods for the ticker
    @property
    def ticker(self):
        return self._ticker

    @ticker.setter
    def ticker(self, value):
        self._ticker = value
        self._stock_data = self.fetch_stock_data()

    # Getter and setter methods for the start date
    @property
    def start_date(self):
        return self._start_date

    @start_date.setter
    def start_date(self, value):
        self._start_date = value
        self._stock_data = self.fetch_stock_data()

    # Getter and
    # Getter and setter methods for the end date
    @property
    def end_date(self):
        return self._end_date

    @end_date.setter
    def end_date(self, value):
        self._end_date = value
        self._stock_data = self.fetch_stock_data()

    # Getter methods for the other attributes
    @property
    def stock_data(self):
        return self._stock_data

    @property
    def m(self):
        return self._m

    @property
    def c(self):
        return self._c

    @property
    def std(self):
        return self._std

    @property
    def channel_upper(self):
        return self._channel_upper

    @property
    def channel_lower(self):
        return self._channel_lower

    @property
    def outer_upper(self):
        return self._outer_upper

    @property
    def outer_lower(self):
        return self._outer_lower

    def to_dict(self):

        return_data = self.stock_data
        return_data.reset_index(inplace=True)
        return_data["_channel_upper"] = self._channel_upper
        return_data["_channel_lower"] = self._channel_lower
        return_data["_outer_upper"] = self._outer_upper
        return_data["_outer_lower"] = self._outer_lower
        result = {"detail": []}
        for _, row in return_data.iterrows():
            result["detail"].append(row.to_dict())
        return result

    def get_recent_1_year_data_info(self):
        return_data = self.stock_data
        return_data.reset_index(inplace=True)
        # Filter the DataFrame for the recent 1 year data
        one_year_ago = datetime.now() - timedelta(days=365)
        recent_data = return_data.loc[return_data["Date"] >= one_year_ago]
        result = {"recent_1_year_data": []}
        for _, row in recent_data.iterrows():
            result["recent_1_year_data"].append(row.to_dict())
        return result
