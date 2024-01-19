interface BMIData {
    weight: number
    height: number
    bmi: string
}
const calculatorBmi = (weight: number, height: number): BMIData => {
    const bmi = weight / ((height / 100) * (height / 100))
    switch (true) {
        case bmi < 16:
            return {weight, height, bmi: 'Underweight (Severe thinness)'}
        case bmi < 16.9:
            return {weight, height, bmi: 'Underweight (Moderate thinness)'}
        case bmi < 18.4:
            return {weight, height, bmi: 'Underweight (Mild thinness)'}
        case bmi < 24.9:
            return {weight, height, bmi: 'Normal range'}
        case bmi < 29.9:
            return {weight, height, bmi: 'Overweight (pre-obese)'}
        case bmi < 34.9:
            return {weight, height, bmi: 'Obese (class I)'}
        case bmi < 39.9:
            return {weight, height, bmi: 'Obese (class II)'}
        default:
            return {weight, height, bmi: 'Obese (class III)'}
    }
}

export default calculatorBmi