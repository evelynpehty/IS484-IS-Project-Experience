class User_Details:
    def __init__(self, userID,familyName,givenName,taxIdentifier,dateOfBirth,postalCode,addressLine1, addressLine2,country,city,state,countryCode,
    phoneNo,homeNo,registrationDate,nationality, gender,ethnicity,occupation,jobTitle,employerName,maritalStatus,email,chosenColor):
        self.userID = userID
        self.familyName = familyName
        self.givenName = givenName
        self.taxIdentifier = taxIdentifier
        self.dateOfBirth = dateOfBirth
        self.postalCode = postalCode
        self.addressLine1 = addressLine1
        self.addressLine2 = addressLine2
        self.country = country
        self.city = city
        self.state = state
        self.countryCode = countryCode
        self.phoneNo = phoneNo
        self.homeNo = homeNo
        self.registrationDate = registrationDate
        self.nationality = nationality
        self.gender = gender
        self.ethnicity = ethnicity
        self.occupation = occupation
        self.jobTitle = jobTitle
        self.employerName = employerName
        self.maritalStatus = maritalStatus
        self.email = email
        self.chosenColor = chosenColor
    
    def to_dict(self):
        return {
            "UserID": self.userID,
            "FamilyName": self.familyName,
            "GivenName": self.givenName,
            "TaxIdentifier": self.taxIdentifier,
            "DateOfBirth": self.dateOfBirth,
            "PostalCode": self.postalCode,
            "AddressLine1": self.addressLine1,
            "AddressLine2": self.addressLine2,
            "Country": self.country,
            "City": self.city,
            "State": self.state,
            "CountryCode": self.countryCode,
            "PhoneNo": self.phoneNo,
            "HomeNo": self.homeNo,
            "RegistrationDate": self.registrationDate,
            "Nationality": self.nationality,
            "Gender": self.gender,
            "Ethnicity": self.ethnicity,
            "Occupation": self.occupation,
            "JobTitle": self.jobTitle,
            "EmployerName": self.employerName,
            "MaritalStatus": self.maritalStatus,
            "Email": self.email,
            "ChosenColor": self.chosenColor,
        }
    # Getter methods
    def get_userID(self):
        return self.userID

    def get_familyName(self):
        return self.familyName

    def get_givenName(self):
        return self.givenName

    def get_taxIdentifier(self):
        return self.taxIdentifier

    def get_dateOfBirth(self):
        return self.dateOfBirth

    def get_postalCode(self):
        return self.postalCode

    def get_addressLine1(self):
        return self.addressLine1

    def get_addressLine2(self):
        return self.addressLine2

    def get_country(self):
        return self.country

    def get_city(self):
        return self.city

    def get_state(self):
        return self.state

    def get_countryCode(self):
        return self.countryCode

    def get_phoneNo(self):
        return self.phoneNo

    def get_homeNo(self):
        return self.homeNo

    def get_registrationDate(self):
        return self.registrationDate

    def get_nationality(self):
        return self.nationality

    def get_gender(self):
        return self.gender

    def get_ethnicity(self):
        return self.ethnicity

    def get_occupation(self):
        return self.occupation

    def get_jobTitle(self):
        return self.jobTitle

    def get_employerName(self):
        return self.employerName

    def get_maritalStatus(self):
        return self.maritalStatus

    def get_email(self):
        return self.email

    def get_chosenColor(self):
        return self.chosenColor

    # Setter methods
    def set_userID(self, userID):
        self.userID = userID

    def set_familyName(self, familyName):
        self.familyName = familyName

    def set_givenName(self, givenName):
        self.givenName = givenName

    def set_taxIdentifier(self, taxIdentifier):
        self.taxIdentifier = taxIdentifier

    def set_dateOfBirth(self, dateOfBirth):
        self.dateOfBirth = dateOfBirth

    def set_postalCode(self, postalCode):
        self.postalCode = postalCode

    def set_addressLine1(self, addressLine1):
        self.addressLine1 = addressLine1

    def set_addressLine2(self, addressLine2):
        self.addressLine2 = addressLine2

    def set_country(self, country):
        self.country = country

    def set_city(self, city):
        self.city = city

    def set_state(self, state):
        self.state = state

    def set_countryCode(self, countryCode):
        self.countryCode = countryCode

    def set_phoneNo(self, phoneNo):
        self.phoneNo = phoneNo

    def set_homeNo(self, homeNo):
        self.homeNo = homeNo

    def set_registrationDate(self, registrationDate):
        self.registrationDate = registrationDate

    def set_nationality(self, nationality):
        self.nationality = nationality

    def set_gender(self, gender):
        self.gender = gender

    def set_ethnicity(self, ethnicity):
        self.ethnicity = ethnicity

    def set_occupation(self, occupation):
        self.occupation = occupation

    def set_jobTitle(self, jobTitle):
        self.jobTitle = jobTitle

    def set_employerName(self, employerName):
        self.employerName = employerName

    def set_maritalStatus(self, maritalStatus):
        self.maritalStatus = maritalStatus

    def set_email(self, email):
        self.email = email

    def set_chosenColor(self, chosenColor):
        self.chosenColor = chosenColor

    
    # Default methods
    def __str__(self):
        return f"UserID: {self.userID}, FamilyName: {self.familyName}, GivenName: {self.givenName}, TaxIdentifier: {self.taxIdentifier}, DateOfBirth: {self.dateOfBirth}, PostalCode: {self.postalCode}, AddressLine1: {self.addressLine1}, AddressLine2: {self.addressLine2}, Country: {self.country}, City: {self.city}, State: {self.state}, CountryCode: {self.countryCode}, PhoneNo: {self.phoneNo}, HomeNo: {self.homeNo}, RegistrationDate: {self.registrationDate}, Nationality: {self.nationality}, Gender: {self.gender}, Ethnicity: {self.ethnicity}, Occupation: {self.occupation}, JobTitle: {self.jobTitle}, EmployerName: {self.employerName}, MaritalStatus: {self.maritalStatus}, Email: {self.email}, ChosenColor: {self.chosenColor}"

    def __repr__(self):
        return f"User_Details(userID={self.userID}, familyName={self.familyName}, givenName={self.givenName}, taxIdentifier={self.taxIdentifier}, dateOfBirth={self.dateOfBirth}, postalCode={self.postalCode}, addressLine1={self.addressLine1}, addressLine2={self.addressLine2}, country={self.country}, city={self.city}, state={self.state}, countryCode={self.countryCode}, phoneNo={self.phoneNo}, homeNo={self.homeNo}, registrationDate={self.registrationDate}, nationality={self.nationality}, gender={self.gender}, ethnicity={self.ethnicity}, occupation={self.occupation}, jobTitle={self.jobTitle}, employerName={self.employerName}, maritalStatus={self.maritalStatus}, email={self.email}, chosenColor={self.chosenColor})"

    def __eq__(self, other):
        if isinstance(other, User_Details):
            return self.__dict__ == other.__dict__
        return False