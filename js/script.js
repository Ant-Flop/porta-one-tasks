const filePropheties = {
  arrayNumbers: [],
};

const uploadInput = document.getElementById("file-upload");
const calculateButton = document.getElementById("calculate");
const uploadSpinner = document.getElementsByClassName("upload-spinner")[0];
const calculateSpinner =
  document.getElementsByClassName("calculate-spinner")[0];
const maxField = document.getElementById("max-number");
const minField = document.getElementById("min-number");
const medianField = document.getElementById("median");
const averageField = document.getElementById("average");
const longestIncreasingField = document.getElementById("longest-increasing");
const longestDecreasingField = document.getElementById("longest-decreasing");
const calculationTimeField = document.getElementById("calculation-time");

uploadInput.addEventListener("change", (e) => {
  uploadSpinner.style.display = "block";

  let file = e.target.files[0];

  const reader = new FileReader(file);

  reader.readAsText(file);

  reader.onload = () => {
    filePropheties.arrayNumbers = reader.result
      .split("\n")
      .map(parseFloat)
      .filter((num) => !isNaN(num));
    uploadSpinner.style.display = "none";
    calculateButton.disabled = false;
  };
});

calculateButton.addEventListener("click", () => {
  const { arrayNumbers } = filePropheties;
  const arr = [...arrayNumbers];

  const startTime = performance.now();

  minField.innerText = findMin(arr);
  maxField.innerText = findMax(arr);
  medianField.innerText = findMedian(arr);
  averageField.innerText = findAverage(arr);

  longestIncreasingField.innerText = findLongestSubsequence(arr, "increasing");
  longestDecreasingField.innerText = findLongestSubsequence(arr, "decreasing");

  const endTime = performance.now();

  calculationTimeField.innerText = Math.round((endTime - startTime) / 10) / 100;
});

const findMin = (arr) => {
  return arr.reduce((previousValue, currentValue) => {
    if (previousValue > currentValue) return currentValue;
    else return previousValue;
  });
};

const findMax = (arr) => {
  return arr.reduce((previousValue, currentValue) => {
    if (previousValue < currentValue) return currentValue;
    else return previousValue;
  });
};

const findMedian = (arr) => {
  const sortArr = [...arr].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortArr.length / 2);
  if (sortArr.length % 2 === 0) {
    return (sortArr[middleIndex - 1] + sortArr[middleIndex]) / 2;
  } else {
    return sortArr[middleIndex];
  }
};

const findAverage = (arr) => {
  let sum = arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  return Math.round((sum / arr.length) * 100) / 100;
};

const findLongestSubsequence = (arr, direction) => {
  let maxSubsequenceArr = [];
  let currentArr = [];

  const compFunc = (a, b) => (direction === "increasing" ? a > b : a < b);

  arr.forEach((element, index, currentArray) => {
    if (currentArr.length > 0) {
      if (compFunc(element, currentArray[index - 1])) {
        currentArr.push(element);
      } else {
        if (currentArr.length > maxSubsequenceArr.length) {
          maxSubsequenceArr = currentArr;
        }
        currentArr = [];
      }
    } else {
      currentArr.push(element);
    }
  });
  return maxSubsequenceArr;
};
