interface Values {
    height: number
    weight: number
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not number')
    }
}

const bmiCalculator = (height: number, weight: number): string =>  {
    if (height === 0) {
        return 'Error: Height should be greater than zero.';
    }
    height = height / 100
    const result = weight / (height * height);
    let category: string;
    switch (true) {
        case result < 16:
            category = 'Underweight (Severe thinness)';
            break;
        case result < 16.9:
            category = 'Underweight (Moderate thinness)';
            break;
        case result < 18.4:
            category = 'Underweight (Mild thinness)';
            break;
        case result < 24.9:
            category = 'Normal range';
            break;
        case result < 29.9:
            category = 'Overweight (pre-obese)';
            break;
        case result < 34.9:
            category = 'Obese (Class I)';
            break;
        case result < 39.9:
            category = 'Obese (Class II)';
            break;
        default:
            category = 'Obese (Class III)';
    }
    return category;
}
try {
    const {height, weight} = parseArguments(process.argv)
    const result = bmiCalculator(height, weight)
    console.log(result)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}
