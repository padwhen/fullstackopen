interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
    const periodLength = hours.length
    const trainingDays = hours.filter((hour) => hour > 0).length
    const totalHours = hours.reduce((acc, cur) => acc + cur, 0)
    const average = totalHours / periodLength
    const success = average >= target
    let rating: 1 | 2 | 3
    let ratingDescription: string
    if (average < target / 2) {
        rating = 1
        ratingDescription = 'You should do more exercises'
    } else if (average < target) {
        rating = 2
        ratingDescription = 'Not too bad but could be better'
    } else {
        rating = 3
        ratingDescription = 'You are doing great'
    }
    const result: ExerciseResult = {
        periodLength, trainingDays, success, rating, ratingDescription, target, average
    }
    return result
}

const hours: number[] = process.argv.slice(3).map(Number);

if (hours.some(isNaN)) {
    console.error('Invalid input. Please provide a list of numbers.');
    process.exit(1);
}

const target: number = Number(process.argv[2]);
const result = calculateExercises(hours, target);

console.log(result);
