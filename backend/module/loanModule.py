def get_all_loan_account():
    all_loan_account = {

    }
    return all_loan_account

def get_loan_account_detail(account_no):
    account_detail = {
        "Account_Number": account_no,
        "detail":{
            #other details 
        }
        
    }
    return account_detail

#maybe can make some improvement in next few meetings 
def get_calculate_partial_loan_repayment(amount, rate, payment_period_in_year):
    n = payment_period_in_year*12
    r = rate/(100*12)
    monthly_payment = principal*((r*((r+1)**n))/(((r+1)**n)-1))
    return {
        "monthly_payment": monthly_payment
    }

def get_interest_rate_calculation(amount, rate, no_of_year):
    totalAmount = amount
    while no_of_year > 0:
        totalAmount *= (1+rate)

    return {
        "Total_amount": totalAmount
    }