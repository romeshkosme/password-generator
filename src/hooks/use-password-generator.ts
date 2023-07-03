import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState<string>("");
    const [strength, setStrength] = useState<string>("Weak");
    const [percentage, setPercentage] = useState<number>(0);
    const [error, SetError] = useState<string>("");

    const generatePassword = (length: number, uppercase: boolean, number: boolean, symbol: boolean) => {
        let charset = "abcdefghijklmnopqrstuvwxyz", generatedPassword = "";
        if (uppercase) charset+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (number) charset+= "1234567890";
        if (symbol) charset+= "!@#$%^&*";

        for (let index = 0; index < length; index++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex]
        }
        getPasswordStrength(length, uppercase, number, symbol)
        setPassword(generatedPassword);
    }

    const getPasswordStrength = (length: number, uppercase: boolean, number: boolean, symbol: boolean) => {
        const options = [uppercase, number, symbol];
        const optionLevel = options.reduce((acc: any, curr: any) => {
            if (curr) acc++;
            return acc;
        }, 0)

        let lengthLevel = 0;
        if (length >= 18 && length < 30) {
            lengthLevel = 1
        }
        if (length >= 30 && length <= 40) {
            lengthLevel = 2
        }
        const STATUS = [
            "Very weak",
            "Weak",
            "Average",
            "Good",
            "Strong",
            "Very strong"
        ]
        setPercentage(Math.floor((((lengthLevel+optionLevel)*100)/5)))

        setStrength(STATUS[lengthLevel+optionLevel])
    }


    return { password, error, strength, percentage, generatePassword };
}

export default usePasswordGenerator;