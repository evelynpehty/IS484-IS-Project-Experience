import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error

from keras.models import Sequential
from keras.layers import Dense, LSTM
from scipy.stats import norm


class StockPredictor:
    def __init__(self, ticker, start_date, end_date, look_back=7, train_ratio=0.8):
        self.ticker = ticker
        self.start_date = start_date
        self.end_date = end_date
        self.look_back = look_back
        self.train_ratio = train_ratio
        self.scaler = MinMaxScaler()

        self.stock_data = self.fetch_stock_data()
        self.train_data, self.test_data = self.split_data()
        self.model = self.build_model()

    # Getter functions
    def get_ticker(self):
        return self.ticker

    def get_start_date(self):
        return self.start_date

    def get_end_date(self):
        return self.end_date

    def get_look_back(self):
        return self.look_back

    def get_train_ratio(self):
        return self.train_ratio

    def get_scaler(self):
        return self.scaler

    def get_stock_data(self):
        return self.stock_data

    def get_train_data(self):
        return self.train_data

    def get_test_data(self):
        return self.test_data

    def get_model(self):
        return self.model

    # Setter functions
    def set_ticker(self, new_ticker):
        self.ticker = new_ticker

    def set_start_date(self, new_start_date):
        self.start_date = new_start_date

    def set_end_date(self, new_end_date):
        self.end_date = new_end_date

    def set_look_back(self, new_look_back):
        self.look_back = new_look_back

    def set_train_ratio(self, new_train_ratio):
        self.train_ratio = new_train_ratio

    def set_scaler(self, new_scaler):
        self.scaler = new_scaler

    def set_stock_data(self, new_stock_data):
        self.stock_data = new_stock_data

    def set_train_data(self, new_train_data):
        self.train_data = new_train_data

    def set_test_data(self, new_test_data):
        self.test_data = new_test_data

    def set_model(self, new_model):
        self.model = new_model

    def fetch_stock_data(self):
        stock_data = yf.download(self.ticker, start=self.start_date, end=self.end_date)
        stock_data = stock_data["Close"].values.reshape(-1, 1)
        return stock_data

    def normalize_data(self, data):
        return self.scaler.fit_transform(data)

    def split_data(self):
        normalized_data = self.normalize_data(self.stock_data)
        train_size = int(len(normalized_data) * self.train_ratio)
        return normalized_data[:train_size], normalized_data[train_size:]

    def create_dataset(self, data):
        X, y = [], []
        for i in range(len(data) - self.look_back):
            X.append(data[i : (i + self.look_back), 0])
            y.append(data[i + self.look_back, 0])
        return np.array(X), np.array(y)

    def reshape_data(self, data):
        return np.reshape(data, (data.shape[0], data.shape[1], 1))

    def build_model(self):
        model = Sequential()
        model.add(
            LSTM(units=50, return_sequences=True, input_shape=(self.look_back, 1))
        )
        model.add(LSTM(units=50))
        model.add(Dense(1))
        model.compile(loss="mean_squared_error", optimizer="adam")
        return model

    def train(self):
        X_train, y_train = self.create_dataset(self.train_data)
        X_train = self.reshape_data(X_train)

        self.model.fit(X_train, y_train, epochs=100, batch_size=64, verbose=1)

    def predict(self, data):
        X, _ = self.create_dataset(data)
        X = self.reshape_data(X)
        predictions = self.model.predict(X)
        padding = np.zeros((self.look_back, 1))
        return np.concatenate((padding, predictions))

    def predict_future(self, days, confidence=0.95):
        future_data = self.test_data[-self.look_back :].reshape(1, self.look_back, 1)
        future_predictions = []

        for _ in range(days):
            prediction = self.model.predict(future_data)
            future_predictions.append(prediction[0][0])
            future_data = np.roll(future_data, -1)
            future_data[0][-1] = prediction

        future_predictions = np.array(future_predictions).reshape(-1, 1)
        std = np.std(self.test_data[-self.look_back :])
        margin_of_error = std * norm.ppf((1 + confidence) / 2)
        upper_confidence_interval = future_predictions + margin_of_error
        lower_confidence_interval = future_predictions - margin_of_error

        return (
            self.scaler.inverse_transform(future_predictions),
            self.scaler.inverse_transform(upper_confidence_interval),
            self.scaler.inverse_transform(lower_confidence_interval),
        )

    def plot_future(self, train_predict, test_predict, future_predict):
        train_size = len(self.train_data)

        plt.figure(figsize=(12, 6))
        plt.plot(self.stock_data, label="Actual Prices")
        plt.plot(
            np.arange(self.look_back, train_size + self.look_back),
            train_predict,
            label="Train Predictions",
        )
        plt.plot(
            np.arange(train_size + self.look_back, len(self.stock_data)),
            test_predict[: -self.look_back],
            label="Test Predictions",
        )

        # Plot future predictions
        future_start = len(self.stock_data)
        future_end = future_start + len(future_predict)
        plt.plot(
            np.arange(future_start, future_end),
            future_predict,
            label="Future Predictions",
            linestyle="--",
            marker="o",
        )

        plt.xlabel("Days")
        plt.ylabel("Price")
        plt.title("Stock Price Prediction using LSTM")
        plt.legend()
        plt.show()

    def plot(self, train_predict, test_predict):
        plt.figure(figsize=(12, 6))
        plt.plot(self.stock_data, label="Actual Prices")
        plt.plot(
            np.arange(self.look_back, len(self.train_data) + self.look_back),
            train_predict,
            label="Train Predictions",
        )
        plt.plot(
            np.arange(len(self.train_data), len(self.stock_data)),
            test_predict,
            label="Test Predictions",
        )
        # print(test_predict)
        plt.xlabel("Days")
        plt.ylabel("Price")
        plt.title("Stock Price Prediction using LSTM without Prediction")
        plt.legend()
        plt.show()
