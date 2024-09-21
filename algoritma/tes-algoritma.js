// Soal No 1
const reverseText = (text) => {
    const letters = [...text].filter(char => isNaN(char)).reverse();
    const number = [...text].filter(num => !isNaN(num));
    return letters.join('') + number.join('');
};


// Soal No 2
const lengthText = (sentence) => {
    const words = sentence.split(' ');
    const length = words.map(word => word.length);
    const maxLength = Math.max(...length);
    const longestWord = words.find(word => word.length === maxLength);
    return `${longestWord}: ${maxLength} character`;
};

// Soal No 3
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const result = [];
for (const char of QUERY) {
    const count = INPUT.filter(input => input === char).length;
    result.push(count);
}

console.log(result);

// Soal no 4
// pass