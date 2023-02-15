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
