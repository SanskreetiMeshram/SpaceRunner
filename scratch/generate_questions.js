const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'Assets', 'Resources', 'QuestionBanks');
const previewDir = path.join(__dirname, '..', 'WebPreview', 'QuestionBanks');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });

const questionBanks = [
  // LEVEL 1: CLASS 1 (Math Only)
  {
    level: 1,
    class: "1",
    subject: "Math",
    description: "Class 1: Counting 1-20, single-digit addition and subtraction, basic shapes, and number comparisons.",
    questions: [
      {
        id: "L1-MATH-001",
        subject: "Math",
        topic: "Counting",
        difficulty: "easy",
        questionText: "How many stars are there: ★ ★ ★ ★ ★ ?",
        type: "mcq",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        solutionSteps: [
          "Let's count the stars one by one: 1, 2, 3, 4, 5!",
          "There are 5 stars in total.",
          "So the correct answer is 5."
        ],
        hint: "Point to each star with your finger and count out loud: 1, 2, 3, 4, 5."
      },
      {
        id: "L1-MATH-002",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 3 + 2?",
        type: "mcq",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        solutionSteps: [
          "Start with 3 fingers on one hand.",
          "Add 2 more fingers: 4, 5!",
          "3 plus 2 equals 5."
        ],
        hint: "Start at 3 and count forward by 2 steps."
      },
      {
        id: "L1-MATH-003",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "easy",
        questionText: "What is 5 - 1?",
        type: "mcq",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        solutionSteps: [
          "You have 5 delicious apples.",
          "You eat 1 apple. Now count how many are left: 4!",
          "5 take away 1 leaves 4."
        ],
        hint: "Count backward one step from 5."
      },
      {
        id: "L1-MATH-004",
        subject: "Math",
        topic: "Shapes",
        difficulty: "easy",
        questionText: "Which shape has 3 sides and 3 corners?",
        type: "mcq",
        options: ["Circle", "Square", "Triangle", "Rectangle"],
        correctIndex: 2,
        solutionSteps: [
          "A circle is round with zero straight sides.",
          "A square has 4 equal sides.",
          "A triangle has exactly 3 sides and 3 sharp corners!",
          "So the shape is a Triangle."
        ],
        hint: "'Tri' means three! Think of a slice of pizza."
      },
      {
        id: "L1-MATH-005",
        subject: "Math",
        topic: "Comparison",
        difficulty: "easy",
        questionText: "Which number is greater: 8 or 4?",
        type: "mcq",
        options: ["4", "8", "Both are equal", "0"],
        correctIndex: 1,
        solutionSteps: [
          "Imagine 8 shiny gems and 4 shiny gems.",
          "When we count, 8 comes after 4: 1, 2, 3, 4, 5, 6, 7, 8.",
          "8 is a bigger number than 4."
        ],
        hint: "Which pile has more items: 8 or 4?"
      },
      {
        id: "L1-MATH-006",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 4 + 4?",
        type: "mcq",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        solutionSteps: [
          "We want to add 4 and 4.",
          "Count 4 fingers, then count 4 more: 5, 6, 7, 8!",
          "4 + 4 = 8."
        ],
        hint: "Double 4 is the same as 4 + 4."
      },
      {
        id: "L1-MATH-007",
        subject: "Math",
        topic: "Shapes",
        difficulty: "easy",
        questionText: "Which shape has NO straight edges and NO corners?",
        type: "mcq",
        options: ["Square", "Triangle", "Circle", "Cube"],
        correctIndex: 2,
        solutionSteps: [
          "Squares and triangles have straight lines and sharp corners.",
          "A circle is perfectly curved all the way around.",
          "A circle has 0 corners and 0 straight edges!"
        ],
        hint: "Think of a full moon or a round coin."
      },
      {
        id: "L1-MATH-008",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "easy",
        questionText: "What is 6 - 2?",
        type: "mcq",
        options: ["3", "4", "5", "2"],
        correctIndex: 1,
        solutionSteps: [
          "Start at the number 6.",
          "Jump backwards 2 times on the number line: 5, then 4.",
          "6 minus 2 equals 4."
        ],
        hint: "If you have 6 crayons and give 2 away, count how many remain."
      },
      {
        id: "L1-MATH-009",
        subject: "Math",
        topic: "Patterns",
        difficulty: "easy",
        questionText: "What number comes next in the pattern: 2, 4, 6, ___?",
        type: "fill_blank",
        options: ["7", "8", "9", "10"],
        correctIndex: 1,
        solutionSteps: [
          "Look at how the numbers grow: 2 (+2) = 4, 4 (+2) = 6.",
          "We are skip-counting by 2!",
          "6 + 2 = 8. The next number is 8."
        ],
        hint: "Add 2 to the number 6."
      },
      {
        id: "L1-MATH-010",
        subject: "Math",
        topic: "Comparison",
        difficulty: "easy",
        questionText: "Which number is the smallest?",
        type: "mcq",
        options: ["9", "3", "7", "5"],
        correctIndex: 1,
        solutionSteps: [
          "Let's look at all four numbers: 3, 5, 7, 9.",
          "When we count from 1, the first number we reach is 3.",
          "3 is less than 5, 7, and 9. So 3 is the smallest!"
        ],
        hint: "Find the number closest to 1."
      },
      {
        id: "L1-MATH-011",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 7 + 0?",
        type: "mcq",
        options: ["0", "7", "8", "70"],
        correctIndex: 1,
        solutionSteps: [
          "Zero means adding nothing at all.",
          "If you have 7 space coins and collect 0 more, you still have 7 coins!",
          "Any number plus 0 stays the same: 7 + 0 = 7."
        ],
        hint: "Adding zero does not change the number."
      },
      {
        id: "L1-MATH-012",
        subject: "Math",
        topic: "Counting",
        difficulty: "easy",
        questionText: "What number comes right before 10?",
        type: "mcq",
        options: ["8", "9", "11", "7"],
        correctIndex: 1,
        solutionSteps: [
          "Count up towards 10: 7, 8, 9, 10.",
          "The number right before 10 is 9!",
          "10 minus 1 is 9."
        ],
        hint: "Think about the number that comes just before 10 when counting."
      },
      {
        id: "L1-MATH-013",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "easy",
        questionText: "What is 4 - 4?",
        type: "mcq",
        options: ["0", "1", "4", "8"],
        correctIndex: 0,
        solutionSteps: [
          "You have 4 space crystals.",
          "You use all 4 crystals.",
          "When you subtract a number from itself, you are left with nothing: 0!"
        ],
        hint: "If you give away all 4 of your items, how many do you have?"
      },
      {
        id: "L1-MATH-014",
        subject: "Math",
        topic: "Shapes",
        difficulty: "easy",
        questionText: "How many sides does a square have?",
        type: "mcq",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        solutionSteps: [
          "A square has 4 straight sides.",
          "All 4 sides are of the exact same length!",
          "So a square has 4 sides."
        ],
        hint: "A square has the same number of sides as a rectangle: four."
      },
      {
        id: "L1-MATH-015",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 6 + 3?",
        type: "mcq",
        options: ["8", "9", "10", "7"],
        correctIndex: 1,
        solutionSteps: [
          "Put 6 in your head.",
          "Count forward 3 fingers: 7, 8, 9.",
          "6 + 3 = 9!"
        ],
        hint: "Start at 6 and count forward 3 times."
      },
      {
        id: "L1-MATH-016",
        subject: "Math",
        topic: "Counting",
        difficulty: "easy",
        questionText: "Which number comes between 14 and 16?",
        type: "mcq",
        options: ["13", "15", "17", "18"],
        correctIndex: 1,
        solutionSteps: [
          "Let's count through the teens: 13, 14, 15, 16, 17.",
          "Directly between 14 and 16 is 15!",
          "14, 15, 16."
        ],
        hint: "What number comes after 14 and before 16?"
      },
      {
        id: "L1-MATH-017",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "easy",
        questionText: "What is 9 - 3?",
        type: "mcq",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        solutionSteps: [
          "Start with 9 fingers.",
          "Tuck 3 fingers away: 8, 7, 6.",
          "You have 6 fingers left standing. 9 - 3 = 6."
        ],
        hint: "Take away 3 from 9."
      },
      {
        id: "L1-MATH-018",
        subject: "Math",
        topic: "Comparison",
        difficulty: "easy",
        questionText: "Are 7 and 7 equal?",
        type: "mcq",
        options: ["Yes, they are equal", "No, 7 is greater", "No, 7 is smaller", "Cannot tell"],
        correctIndex: 0,
        solutionSteps: [
          "Both sides have the exact same number: 7.",
          "Since they are the same amount, they are equal (=)!",
          "7 = 7."
        ],
        hint: "When two numbers are the exact same, they are equal."
      },
      {
        id: "L1-MATH-019",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 5 + 5?",
        type: "mcq",
        options: ["8", "9", "10", "11"],
        correctIndex: 2,
        solutionSteps: [
          "You have 5 fingers on your left hand.",
          "You have 5 fingers on your right hand.",
          "Together you have 10 fingers! 5 + 5 = 10."
        ],
        hint: "Count all the fingers on both of your hands together."
      },
      {
        id: "L1-MATH-020",
        subject: "Math",
        topic: "Counting",
        difficulty: "easy",
        questionText: "What is the number of sides on a coin?",
        type: "mcq",
        options: ["1 curved edge", "3 straight edges", "4 straight edges", "0 edges"],
        correctIndex: 0,
        solutionSteps: [
          "A coin is shaped like a circle.",
          "A circle has one continuous smooth curved boundary, not straight polygon sides.",
          "So a coin has 1 curved round edge."
        ],
        hint: "Feel a round coin. It curves smoothly all around."
      }
    ]
  },

  // LEVEL 2: CLASS 2 (Math Only)
  {
    level: 2,
    class: "2",
    subject: "Math",
    description: "Class 2: Addition and subtraction up to 100, 2/5/10 multiplication tables, place value, and word problems.",
    questions: [
      {
        id: "L2-MATH-001",
        subject: "Math",
        topic: "Addition",
        difficulty: "easy",
        questionText: "What is 24 + 15?",
        type: "mcq",
        options: ["38", "39", "40", "29"],
        correctIndex: 1,
        solutionSteps: [
          "Add the ones place first: 4 ones + 5 ones = 9 ones.",
          "Now add the tens place: 2 tens + 1 ten = 3 tens.",
          "Put them together: 3 tens and 9 ones make 39!"
        ],
        hint: "Add 4+5 first, then add 20+10."
      },
      {
        id: "L2-MATH-002",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "easy",
        questionText: "What is 50 - 25?",
        type: "mcq",
        options: ["20", "25", "30", "35"],
        correctIndex: 1,
        solutionSteps: [
          "Think of 50 as two 25s: 25 + 25 = 50.",
          "If you take away 25 from 50, exactly 25 remains.",
          "50 - 25 = 25."
        ],
        hint: "Two quarters (25 + 25) make 50."
      },
      {
        id: "L2-MATH-003",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "easy",
        questionText: "What is 2 × 7?",
        type: "mcq",
        options: ["12", "14", "16", "18"],
        correctIndex: 1,
        solutionSteps: [
          "2 × 7 means 7 added two times: 7 + 7.",
          "7 + 7 = 14.",
          "So, 2 × 7 = 14."
        ],
        hint: "Double the number 7."
      },
      {
        id: "L2-MATH-004",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "easy",
        questionText: "What is 5 × 4?",
        type: "mcq",
        options: ["15", "20", "25", "30"],
        correctIndex: 1,
        solutionSteps: [
          "Count by 5s four times: 5, 10, 15, 20!",
          "4 groups of 5 equal 20.",
          "Therefore, 5 × 4 = 20."
        ],
        hint: "Skip count by 5 four times."
      },
      {
        id: "L2-MATH-005",
        subject: "Math",
        topic: "Place Value",
        difficulty: "easy",
        questionText: "In the number 68, what is the value of the digit 6?",
        type: "mcq",
        options: ["6", "60", "8", "68"],
        correctIndex: 1,
        solutionSteps: [
          "Look at the position of each digit in 68.",
          "8 is in the ones place, worth 8.",
          "6 is in the tens place, so it represents 6 tens = 60!"
        ],
        hint: "The 6 is in the tens column."
      },
      {
        id: "L2-MATH-006",
        subject: "Math",
        topic: "Word Problems",
        difficulty: "medium",
        questionText: "Riya has 18 stickers. Her brother gives her 12 more. How many stickers does she have now?",
        type: "mcq",
        options: ["28", "30", "32", "26"],
        correctIndex: 1,
        solutionSteps: [
          "Riya starts with 18 stickers and receives 12 more, so we add: 18 + 12.",
          "Add the ones: 8 + 2 = 10 (carry over 1 ten).",
          "Add the tens: 1 ten + 1 ten + 1 carried ten = 3 tens.",
          "Total stickers = 30."
        ],
        hint: "18 + 12 = ?"
      },
      {
        id: "L2-MATH-007",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "easy",
        questionText: "What is 10 × 6?",
        type: "mcq",
        options: ["50", "60", "70", "16"],
        correctIndex: 1,
        solutionSteps: [
          "Multiplying by 10 means placing a zero after the number.",
          "6 with a 0 at the end becomes 60.",
          "10 × 6 = 60."
        ],
        hint: "Put a 0 at the end of 6."
      },
      {
        id: "L2-MATH-008",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "medium",
        questionText: "What is 74 - 23?",
        type: "mcq",
        options: ["51", "52", "49", "61"],
        correctIndex: 0,
        solutionSteps: [
          "Subtract the ones digits: 4 - 3 = 1.",
          "Subtract the tens digits: 7 - 2 = 5.",
          "Combine tens and ones: 5 tens and 1 one = 51."
        ],
        hint: "Subtract ones (4-3) then tens (7-2)."
      },
      {
        id: "L2-MATH-009",
        subject: "Math",
        topic: "Even and Odd",
        difficulty: "easy",
        questionText: "Which of the following numbers is an EVEN number?",
        type: "mcq",
        options: ["13", "17", "24", "31"],
        correctIndex: 2,
        solutionSteps: [
          "Even numbers end in 0, 2, 4, 6, or 8 and can be split into pairs.",
          "13 ends in 3 (odd), 17 ends in 7 (odd), 31 ends in 1 (odd).",
          "24 ends in 4, so it is an even number!"
        ],
        hint: "Check the last digit. Even numbers end in 0, 2, 4, 6, or 8."
      },
      {
        id: "L2-MATH-010",
        subject: "Math",
        topic: "Time",
        difficulty: "medium",
        questionText: "How many minutes are in 1 hour?",
        type: "mcq",
        options: ["30 minutes", "50 minutes", "60 minutes", "100 minutes"],
        correctIndex: 2,
        solutionSteps: [
          "A clock's minute hand goes all the way around the face in one full hour.",
          "It counts 60 tick marks as it completes the circle.",
          "Therefore, 1 hour = 60 minutes."
        ],
        hint: "Think about how many minutes the long hand takes to travel from 12 back to 12."
      },
      {
        id: "L2-MATH-011",
        subject: "Math",
        topic: "Addition",
        difficulty: "medium",
        questionText: "What is 45 + 35?",
        type: "mcq",
        options: ["70", "80", "75", "85"],
        correctIndex: 1,
        solutionSteps: [
          "Add the ones: 5 + 5 = 10 (write 0, carry 1 to tens).",
          "Add the tens: 4 + 3 + 1 (carried) = 8 tens.",
          "8 tens and 0 ones = 80."
        ],
        hint: "40 + 30 = 70, and 5 + 5 = 10. Now add 70 + 10."
      },
      {
        id: "L2-MATH-012",
        subject: "Math",
        topic: "Word Problems",
        difficulty: "medium",
        questionText: "A basket has 35 apples. 15 apples are taken away. How many are left?",
        type: "mcq",
        options: ["15", "20", "25", "30"],
        correctIndex: 1,
        solutionSteps: [
          "We subtract 15 from 35: 35 - 15.",
          "Ones: 5 - 5 = 0.",
          "Tens: 3 - 1 = 2.",
          "Result = 20 apples left."
        ],
        hint: "35 minus 15."
      },
      {
        id: "L2-MATH-013",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "easy",
        questionText: "What is 5 × 8?",
        type: "mcq",
        options: ["35", "40", "45", "50"],
        correctIndex: 1,
        solutionSteps: [
          "Counting by 5s eight times gives:",
          "5, 10, 15, 20, 25, 30, 35, 40.",
          "So 5 × 8 = 40."
        ],
        hint: "Half of 10 × 8 is 40."
      },
      {
        id: "L2-MATH-014",
        subject: "Math",
        topic: "Place Value",
        difficulty: "medium",
        questionText: "What number has 7 tens and 3 ones?",
        type: "mcq",
        options: ["37", "73", "703", "10"],
        correctIndex: 1,
        solutionSteps: [
          "7 tens equals 70.",
          "3 ones equals 3.",
          "70 + 3 = 73!"
        ],
        hint: "Put the tens digit in front of the ones digit."
      },
      {
        id: "L2-MATH-015",
        subject: "Math",
        topic: "Money",
        difficulty: "easy",
        questionText: "How many 10-rupee notes make 50 rupees?",
        type: "mcq",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        solutionSteps: [
          "Count by 10s up to 50: 10, 20, 30, 40, 50.",
          "That was 5 notes of 10 rupees.",
          "50 ÷ 10 = 5."
        ],
        hint: "50 divided by 10."
      },
      {
        id: "L2-MATH-016",
        subject: "Math",
        topic: "Addition",
        difficulty: "medium",
        questionText: "What is 56 + 21?",
        type: "mcq",
        options: ["76", "77", "78", "67"],
        correctIndex: 1,
        solutionSteps: [
          "Add ones: 6 + 1 = 7.",
          "Add tens: 5 + 2 = 7.",
          "Combining gives 77."
        ],
        hint: "50+20=70, 6+1=7."
      },
      {
        id: "L2-MATH-017",
        subject: "Math",
        topic: "Subtraction",
        difficulty: "medium",
        questionText: "What is 88 - 33?",
        type: "mcq",
        options: ["44", "55", "66", "53"],
        correctIndex: 1,
        solutionSteps: [
          "Ones: 8 - 3 = 5.",
          "Tens: 8 - 3 = 5.",
          "Result = 55."
        ],
        hint: "Both digits are 8 minus 3."
      },
      {
        id: "L2-MATH-018",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "easy",
        questionText: "What is 2 × 9?",
        type: "mcq",
        options: ["16", "18", "20", "22"],
        correctIndex: 1,
        solutionSteps: [
          "2 × 9 is 9 doubled: 9 + 9.",
          "9 + 9 = 18.",
          "So 2 × 9 = 18."
        ],
        hint: "Add 9 to 9."
      },
      {
        id: "L2-MATH-019",
        subject: "Math",
        topic: "Comparison",
        difficulty: "medium",
        questionText: "Fill in the blank: 63 ___ 72",
        type: "mcq",
        options: ["> (greater than)", "< (less than)", "= (equal to)", "+"],
        correctIndex: 1,
        solutionSteps: [
          "Compare the tens place: 6 tens is less than 7 tens.",
          "Because 63 is smaller than 72, we use the '<' symbol.",
          "63 < 72."
        ],
        hint: "The small point points towards the smaller number (63)."
      },
      {
        id: "L2-MATH-020",
        subject: "Math",
        topic: "Word Problems",
        difficulty: "medium",
        questionText: "An alien ship has 4 rows of seats. Each row has 5 seats. How many seats are there?",
        type: "mcq",
        options: ["15", "18", "20", "25"],
        correctIndex: 2,
        solutionSteps: [
          "4 rows with 5 seats each means 4 × 5.",
          "Count by 5s: 5, 10, 15, 20.",
          "Total seats = 20."
        ],
        hint: "Multiply 4 rows by 5 seats."
      }
    ]
  },

  // LEVEL 3: CLASS 3 (Math Only)
  {
    level: 3,
    class: "3",
    subject: "Math",
    description: "Class 3: Multiplication tables up to 10, simple division, basic fractions (1/2, 1/4), and measurement units.",
    questions: [
      {
        id: "L3-MATH-001",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 7 × 8?",
        type: "mcq",
        options: ["54", "56", "58", "64"],
        correctIndex: 1,
        solutionSteps: [
          "Use the 7 times table or 8 times table.",
          "7 × 7 = 49, and 49 + 7 = 56.",
          "Therefore, 7 × 8 = 56."
        ],
        hint: "Remember the rhyme: 5, 6, 7, 8 -> 56 = 7 × 8!"
      },
      {
        id: "L3-MATH-002",
        subject: "Math",
        topic: "Division",
        difficulty: "easy",
        questionText: "What is 24 ÷ 4?",
        type: "mcq",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        solutionSteps: [
          "Division asks: How many 4s are in 24?",
          "We know that 4 × 6 = 24.",
          "So, 24 ÷ 4 = 6."
        ],
        hint: "What number multiplied by 4 gives 24?"
      },
      {
        id: "L3-MATH-003",
        subject: "Math",
        topic: "Fractions",
        difficulty: "easy",
        questionText: "What is 1/2 of 18?",
        type: "mcq",
        options: ["6", "8", "9", "12"],
        correctIndex: 2,
        solutionSteps: [
          "Half of a number means dividing it by 2: 18 ÷ 2.",
          "2 × 9 = 18.",
          "So half of 18 is 9."
        ],
        hint: "Split 18 into two equal groups."
      },
      {
        id: "L3-MATH-004",
        subject: "Math",
        topic: "Measurement",
        difficulty: "easy",
        questionText: "How many centimeters (cm) are in 1 meter (m)?",
        type: "mcq",
        options: ["10 cm", "100 cm", "1000 cm", "60 cm"],
        correctIndex: 1,
        solutionSteps: [
          "'Centi' means one hundredth part of something.",
          "There are exactly 100 centimeters in 1 meter.",
          "1 m = 100 cm."
        ],
        hint: "Think of a standard school meter ruler: 100 cm."
      },
      {
        id: "L3-MATH-005",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 9 × 6?",
        type: "mcq",
        options: ["45", "54", "63", "56"],
        correctIndex: 1,
        solutionSteps: [
          "10 × 6 = 60.",
          "Subtract one 6 from 60: 60 - 6 = 54.",
          "So 9 × 6 = 54."
        ],
        hint: "In the 9s table, the digits add up to 9: 5 + 4 = 9!"
      },
      {
        id: "L3-MATH-006",
        subject: "Math",
        topic: "Division",
        difficulty: "medium",
        questionText: "What is 45 ÷ 5?",
        type: "mcq",
        options: ["7", "8", "9", "10"],
        correctIndex: 2,
        solutionSteps: [
          "Recall the 5 times table: 5 × 9 = 45.",
          "When 45 is divided equally into 5 parts, each part is 9.",
          "45 ÷ 5 = 9."
        ],
        hint: "What number multiplied by 5 gives 45?"
      },
      {
        id: "L3-MATH-007",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "If a pizza is cut into 4 equal slices and you eat 1 slice, what fraction did you eat?",
        type: "mcq",
        options: ["1/2", "1/4", "3/4", "1/3"],
        correctIndex: 1,
        solutionSteps: [
          "The bottom number (denominator) is the total equal slices: 4.",
          "The top number (numerator) is the slices eaten: 1.",
          "The fraction is 1/4 (one quarter)."
        ],
        hint: "1 slice out of 4 total slices is written as 1/4."
      },
      {
        id: "L3-MATH-008",
        subject: "Math",
        topic: "Measurement",
        difficulty: "easy",
        questionText: "How many grams (g) make 1 kilogram (kg)?",
        type: "mcq",
        options: ["100 g", "500 g", "1000 g", "10000 g"],
        correctIndex: 2,
        solutionSteps: [
          "The prefix 'kilo' means one thousand.",
          "So 1 kilogram = 1000 grams.",
          "1 kg = 1000 g."
        ],
        hint: "'Kilo' always means 1,000."
      },
      {
        id: "L3-MATH-009",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 8 × 4?",
        type: "mcq",
        options: ["24", "28", "32", "36"],
        correctIndex: 2,
        solutionSteps: [
          "8 × 2 = 16.",
          "Double 16 to multiply by 4: 16 + 16 = 32.",
          "8 × 4 = 32."
        ],
        hint: "Double 8 twice: 8 -> 16 -> 32."
      },
      {
        id: "L3-MATH-010",
        subject: "Math",
        topic: "Geometry",
        difficulty: "medium",
        questionText: "A square has sides of length 5 cm. What is its perimeter?",
        type: "mcq",
        options: ["15 cm", "20 cm", "25 cm", "10 cm"],
        correctIndex: 1,
        solutionSteps: [
          "Perimeter is the distance all the way around the shape.",
          "A square has 4 equal sides: Perimeter = 4 × side length.",
          "4 × 5 cm = 20 cm."
        ],
        hint: "Add up all 4 sides: 5 + 5 + 5 + 5."
      },
      {
        id: "L3-MATH-011",
        subject: "Math",
        topic: "Division",
        difficulty: "easy",
        questionText: "What is 36 ÷ 6?",
        type: "mcq",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        solutionSteps: [
          "Think: What number multiplied by 6 equals 36?",
          "6 × 6 = 36.",
          "Therefore, 36 ÷ 6 = 6."
        ],
        hint: "6 times what is 36?"
      },
      {
        id: "L3-MATH-012",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "What is 1/4 of 20?",
        type: "mcq",
        options: ["4", "5", "6", "10"],
        correctIndex: 1,
        solutionSteps: [
          "To find 1/4 of 20, divide 20 by 4: 20 ÷ 4.",
          "4 × 5 = 20.",
          "So 1/4 of 20 is 5."
        ],
        hint: "Divide 20 by 4."
      },
      {
        id: "L3-MATH-013",
        subject: "Math",
        topic: "Measurement",
        difficulty: "easy",
        questionText: "How many milliliters (mL) are in 1 liter (L)?",
        type: "mcq",
        options: ["100 mL", "500 mL", "1000 mL", "10000 mL"],
        correctIndex: 2,
        solutionSteps: [
          "'Milli' means one thousandth part.",
          "There are 1,000 milliliters in 1 whole liter.",
          "1 L = 1000 mL."
        ],
        hint: "Like grams in a kilogram, there are 1,000 milliliters in a liter."
      },
      {
        id: "L3-MATH-014",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 6 × 7?",
        type: "mcq",
        options: ["36", "42", "48", "49"],
        correctIndex: 1,
        solutionSteps: [
          "6 × 6 = 36.",
          "Add one more 6: 36 + 6 = 42.",
          "So 6 × 7 = 42."
        ],
        hint: "Count six 7s or seven 6s."
      },
      {
        id: "L3-MATH-015",
        subject: "Math",
        topic: "Division",
        difficulty: "medium",
        questionText: "Divide 32 space crystals equally among 8 alien explorers. How many crystals does each get?",
        type: "mcq",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        solutionSteps: [
          "Divide 32 by 8: 32 ÷ 8.",
          "8 × 4 = 32.",
          "Each alien gets 4 crystals."
        ],
        hint: "32 ÷ 8 = ?"
      },
      {
        id: "L3-MATH-016",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "Which fraction is bigger: 1/2 or 1/4?",
        type: "mcq",
        options: ["1/4", "1/2", "Both are equal", "Cannot be determined"],
        correctIndex: 1,
        solutionSteps: [
          "Imagine cutting two identical cakes.",
          "One cake is split into 2 big halves (1/2).",
          "The other cake is cut into 4 smaller pieces (1/4).",
          "One half (1/2) is much bigger than one quarter (1/4)!"
        ],
        hint: "Fewer slices mean each slice is bigger."
      },
      {
        id: "L3-MATH-017",
        subject: "Math",
        topic: "Patterns",
        difficulty: "medium",
        questionText: "What is the missing number: 100, 200, 300, ___, 500?",
        type: "fill_blank",
        options: ["350", "400", "450", "600"],
        correctIndex: 1,
        solutionSteps: [
          "The pattern increases by 100 every step: 100, 200, 300...",
          "300 + 100 = 400.",
          "The missing number is 400."
        ],
        hint: "Add 100 to 300."
      },
      {
        id: "L3-MATH-018",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 9 × 9?",
        type: "mcq",
        options: ["72", "81", "90", "99"],
        correctIndex: 1,
        solutionSteps: [
          "9 × 9 is nine squared.",
          "10 × 9 = 90. Subtract 9: 90 - 9 = 81.",
          "9 × 9 = 81."
        ],
        hint: "9 times 9 is eighty-one."
      },
      {
        id: "L3-MATH-019",
        subject: "Math",
        topic: "Time",
        difficulty: "medium",
        questionText: "How many days are in a regular non-leap year?",
        type: "mcq",
        options: ["360", "365", "366", "350"],
        correctIndex: 1,
        solutionSteps: [
          "Earth takes about 365 days to orbit the Sun once.",
          "A regular year has 365 days (a leap year has 366).",
          "Correct answer = 365 days."
        ],
        hint: "365 days in a standard year."
      },
      {
        id: "L3-MATH-020",
        subject: "Math",
        topic: "Geometry",
        difficulty: "medium",
        questionText: "What is the perimeter of a rectangle with length 6 cm and width 4 cm?",
        type: "mcq",
        options: ["10 cm", "20 cm", "24 cm", "14 cm"],
        correctIndex: 1,
        solutionSteps: [
          "A rectangle has 2 lengths and 2 widths.",
          "Perimeter = 2 × (length + width).",
          "6 + 4 = 10 cm. 2 × 10 cm = 20 cm."
        ],
        hint: "Add all four sides: 6 + 4 + 6 + 4."
      }
    ]
  },

  // LEVEL 4: CLASS 4 (Math + Intro EVS)
  {
    level: 4,
    class: "4",
    subject: "Math & EVS",
    description: "Class 4: Multi-digit multiplication, fractions & decimals, perimeter/area basics, plants, animals, and environment.",
    questions: [
      {
        id: "L4-MATH-001",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 25 × 12?",
        type: "mcq",
        options: ["250", "275", "300", "325"],
        correctIndex: 2,
        solutionSteps: [
          "Split 12 into 10 + 2: 25 × (10 + 2).",
          "25 × 10 = 250.",
          "25 × 2 = 50.",
          "Add them up: 250 + 50 = 300."
        ],
        hint: "25 × 10 = 250, then add 25 × 2."
      },
      {
        id: "L4-EVS-002",
        subject: "EVS",
        topic: "Plants",
        difficulty: "easy",
        questionText: "Which green pigment in plant leaves absorbs sunlight for photosynthesis?",
        type: "mcq",
        options: ["Hemoglobin", "Chlorophyll", "Melanin", "Stomata"],
        correctIndex: 1,
        solutionSteps: [
          "Plants need light energy to synthesize their food.",
          "Leaves contain a special green pigment called chlorophyll.",
          "Chlorophyll captures energy from sunlight to make glucose."
        ],
        hint: "It gives leaves their green color."
      },
      {
        id: "L4-MATH-003",
        subject: "Math",
        topic: "Decimals",
        difficulty: "medium",
        questionText: "Which decimal is equal to the fraction 1/2?",
        type: "mcq",
        options: ["0.2", "0.5", "0.25", "0.05"],
        correctIndex: 1,
        solutionSteps: [
          "1/2 represents one divided by two: 1 ÷ 2.",
          "1.0 ÷ 2 = 0.5.",
          "So 1/2 = 0.5 (five tenths)."
        ],
        hint: "0.5 is half of 1.0."
      },
      {
        id: "L4-EVS-004",
        subject: "EVS",
        topic: "Animals",
        difficulty: "easy",
        questionText: "Why do desert animals like camels have broad, padded feet?",
        type: "mcq",
        options: [
          "To sink deep into sand",
          "To spread their weight so they don't sink in loose sand",
          "To swim faster in water",
          "To run in snow"
        ],
        hint: "A larger surface area reduces pressure on the soft sand.",
        correctIndex: 1,
        solutionSteps: [
          "Loose desert sand easily shifts under pressure.",
          "Broad padded feet have a large surface area.",
          "Larger area spreads the camel's weight, keeping it from sinking into the sand!"
        ]
      },
      {
        id: "L4-MATH-005",
        subject: "Math",
        topic: "Area",
        difficulty: "medium",
        questionText: "What is the area of a rectangle with length 8 cm and breadth 5 cm?",
        type: "mcq",
        options: ["13 sq cm", "26 sq cm", "40 sq cm", "45 sq cm"],
        correctIndex: 2,
        solutionSteps: [
          "Area of a rectangle = Length × Breadth.",
          "8 cm × 5 cm = 40 square centimeters (sq cm).",
          "Therefore, Area = 40 sq cm."
        ],
        hint: "Multiply length by breadth."
      },
      {
        id: "L4-EVS-006",
        subject: "EVS",
        topic: "Environment",
        difficulty: "easy",
        questionText: "Which of the following is a BIODEGRADABLE waste item?",
        type: "mcq",
        options: ["Plastic bottle", "Banana peel", "Glass bottle", "Aluminium can"],
        correctIndex: 1,
        solutionSteps: [
          "Biodegradable materials decompose naturally through microorganisms.",
          "Plastics, glass, and metals take hundreds of years to break down.",
          "A banana peel is organic matter and decomposes quickly into soil!"
        ],
        hint: "Look for the natural fruit waste that rots into compost."
      },
      {
        id: "L4-MATH-007",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "What is 2/5 + 1/5?",
        type: "mcq",
        options: ["3/10", "3/5", "2/10", "1/5"],
        correctIndex: 1,
        solutionSteps: [
          "When fractions have the same denominator (5), keep the denominator unchanged.",
          "Add the numerators: 2 + 1 = 3.",
          "The answer is 3/5."
        ],
        hint: "Add only the top numbers when denominators match."
      },
      {
        id: "L4-EVS-008",
        subject: "EVS",
        topic: "Water Cycle",
        difficulty: "easy",
        questionText: "What is the process where water turns into water vapor due to heat?",
        type: "mcq",
        options: ["Condensation", "Evaporation", "Precipitation", "Freezing"],
        correctIndex: 1,
        solutionSteps: [
          "The Sun heats up water in oceans, lakes, and rivers.",
          "Warm liquid water changes into gaseous water vapor.",
          "This phase change is called Evaporation."
        ],
        hint: "Liquid turning into vapor is evaporation."
      },
      {
        id: "L4-MATH-009",
        subject: "Math",
        topic: "Division",
        difficulty: "medium",
        questionText: "What is the quotient and remainder when 53 is divided by 5?",
        type: "mcq",
        options: [
          "Quotient = 10, Remainder = 3",
          "Quotient = 9, Remainder = 8",
          "Quotient = 10, Remainder = 0",
          "Quotient = 11, Remainder = 2"
        ],
        correctIndex: 0,
        solutionSteps: [
          "5 goes into 53 ten times: 5 × 10 = 50.",
          "Subtract 50 from 53: 53 - 50 = 3.",
          "Quotient is 10, and Remainder is 3."
        ],
        hint: "5 × 10 = 50, how much is left over?"
      },
      {
        id: "L4-EVS-010",
        subject: "EVS",
        topic: "Habitats",
        difficulty: "medium",
        questionText: "Why do aquatic animals like fish have gills instead of lungs?",
        type: "mcq",
        options: [
          "To breathe air above water",
          "To absorb dissolved oxygen from water",
          "To filter food particles only",
          "To stay warm in cold water"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Water contains dissolved oxygen gas.",
          "Gills have thin membranes rich in blood vessels.",
          "Water flowing over gills allows oxygen to pass directly into the fish's bloodstream."
        ],
        hint: "Gills take dissolved oxygen directly from water."
      },
      {
        id: "L4-MATH-011",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 15 × 4?",
        type: "mcq",
        options: ["50", "60", "70", "45"],
        correctIndex: 1,
        solutionSteps: [
          "15 × 2 = 30.",
          "30 × 2 = 60.",
          "So 15 × 4 = 60."
        ],
        hint: "Think of 4 quarters of an hour: 15 × 4 = 60 minutes."
      },
      {
        id: "L4-EVS-012",
        subject: "EVS",
        topic: "Plants",
        difficulty: "easy",
        questionText: "Which part of a plant absorbs water and minerals from the soil?",
        type: "mcq",
        options: ["Stem", "Leaves", "Roots", "Flowers"],
        correctIndex: 2,
        solutionSteps: [
          "The roots spread out deep into the moist ground.",
          "Tiny root hairs absorb water and dissolved soil minerals.",
          "Roots also anchor the plant firmly in the soil."
        ],
        hint: "They grow underground."
      },
      {
        id: "L4-MATH-013",
        subject: "Math",
        topic: "Perimeter",
        difficulty: "medium",
        questionText: "An equilateral triangle has sides of length 7 cm each. What is its perimeter?",
        type: "mcq",
        options: ["14 cm", "21 cm", "28 cm", "49 cm"],
        correctIndex: 1,
        solutionSteps: [
          "An equilateral triangle has 3 equal sides.",
          "Perimeter = 3 × side length.",
          "3 × 7 cm = 21 cm."
        ],
        hint: "Multiply 3 by 7."
      },
      {
        id: "L4-EVS-014",
        subject: "EVS",
        topic: "Air & Atmosphere",
        difficulty: "easy",
        questionText: "Which gas do humans and animals breathe IN for respiration?",
        type: "mcq",
        options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Argon"],
        correctIndex: 1,
        solutionSteps: [
          "Our lungs take in air from the atmosphere.",
          "Our body absorbs Oxygen from this air to release energy from food.",
          "We exhale carbon dioxide as a waste gas."
        ],
        hint: "We breathe in oxygen and breathe out carbon dioxide."
      },
      {
        id: "L4-MATH-015",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "What is 3/4 - 1/4 in simplest form?",
        type: "mcq",
        options: ["2/4 (which is 1/2)", "1/4", "3/8", "1"],
        correctIndex: 0,
        solutionSteps: [
          "Subtract the numerators: 3 - 1 = 2.",
          "Keep the denominator: 2/4.",
          "Simplify by dividing top and bottom by 2: 2/4 = 1/2."
        ],
        hint: "3 quarters minus 1 quarter leaves 2 quarters (half)."
      },
      {
        id: "L4-EVS-016",
        subject: "EVS",
        topic: "Ecosystems",
        difficulty: "medium",
        questionText: "In a simple food chain: Grass → Deer → Tiger, which organism is the PRODUCER?",
        type: "mcq",
        options: ["Grass", "Deer", "Tiger", "Sun"],
        correctIndex: 0,
        solutionSteps: [
          "Producers make their own food using sunlight via photosynthesis.",
          "Animals must consume other living organisms.",
          "Grass produces its own food, making it the producer!"
        ],
        hint: "The plant that makes food using sunlight."
      },
      {
        id: "L4-MATH-017",
        subject: "Math",
        topic: "Decimals",
        difficulty: "medium",
        questionText: "What is 2.5 + 3.4?",
        type: "mcq",
        options: ["5.8", "5.9", "6.0", "6.1"],
        correctIndex: 1,
        solutionSteps: [
          "Align decimal points: tenths place is 5 + 4 = 9.",
          "Ones place is 2 + 3 = 5.",
          "Result = 5.9."
        ],
        hint: "2 + 3 = 5, and 0.5 + 0.4 = 0.9."
      },
      {
        id: "L4-EVS-018",
        subject: "EVS",
        topic: "Earth & Space",
        difficulty: "easy",
        questionText: "What causes Day and Night on Earth?",
        type: "mcq",
        options: [
          "Earth revolving around the Sun",
          "Earth rotating on its own axis",
          "The Moon blocking the Sun",
          "The Sun moving across the sky"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Earth rotates like a spinning top on its axis once every 24 hours.",
          "The side facing the Sun has daylight.",
          "The side facing away experiences night!"
        ],
        hint: "Rotation on its axis takes 24 hours."
      },
      {
        id: "L4-MATH-019",
        subject: "Math",
        topic: "Multiplication",
        difficulty: "medium",
        questionText: "What is 100 × 45?",
        type: "mcq",
        options: ["450", "4500", "45000", "4050"],
        correctIndex: 1,
        solutionSteps: [
          "Multiplying by 100 adds two zeros to the end of any whole number.",
          "45 followed by 00 becomes 4,500.",
          "100 × 45 = 4500."
        ],
        hint: "Write 45 and add two zeros."
      },
      {
        id: "L4-EVS-020",
        subject: "EVS",
        topic: "Water",
        difficulty: "easy",
        questionText: "What happens to liquid water when its temperature drops to 0° Celsius?",
        type: "mcq",
        options: ["It boils into steam", "It freezes into solid ice", "It dissolves", "It disappears"],
        correctIndex: 1,
        solutionSteps: [
          "0°C is the freezing point of pure water.",
          "When cooled to 0°C, liquid water molecules lock into solid crystals of ice.",
          "Water turns into solid ice."
        ],
        hint: "0°C is the freezing point."
      }
    ]
  },

  // LEVEL 5: CLASS 5 (Math + Science/EVS)
  {
    level: 5,
    class: "5",
    subject: "Math & Science",
    description: "Class 5: Percentages, LCM/HCF basics, angles & geometry, states of matter, and human organ systems.",
    questions: [
      {
        id: "L5-MATH-001",
        subject: "Math",
        topic: "Percentages",
        difficulty: "medium",
        questionText: "What is 50% of 240?",
        type: "mcq",
        options: ["100", "120", "140", "60"],
        correctIndex: 1,
        solutionSteps: [
          "50% means 50 per 100, which simplifies to 1/2 (half).",
          "To find 50% of 240, take half of 240: 240 ÷ 2.",
          "240 ÷ 2 = 120."
        ],
        hint: "50% is simply half of the number."
      },
      {
        id: "L5-SCI-002",
        subject: "Science",
        topic: "Human Body",
        difficulty: "easy",
        questionText: "Which organ in the human body continuously pumps blood to all organs?",
        type: "mcq",
        options: ["Lungs", "Brain", "Heart", "Kidneys"],
        correctIndex: 2,
        solutionSteps: [
          "The heart is a muscular organ located in the chest.",
          "It contracts rhythmically to pump oxygen-rich blood through arteries.",
          "Therefore, the heart is the circulatory pump of our body."
        ],
        hint: "It beats inside your chest about 70-80 times every minute."
      },
      {
        id: "L5-MATH-003",
        subject: "Math",
        topic: "LCM",
        difficulty: "medium",
        questionText: "What is the Lowest Common Multiple (LCM) of 4 and 6?",
        type: "mcq",
        options: ["8", "12", "16", "24"],
        correctIndex: 1,
        solutionSteps: [
          "List multiples of 4: 4, 8, 12, 16, 20...",
          "List multiples of 6: 6, 12, 18, 24...",
          "The smallest number common to both lists is 12.",
          "LCM(4, 6) = 12."
        ],
        hint: "Find the smallest number that both 4 and 6 divide into evenly."
      },
      {
        id: "L5-SCI-004",
        subject: "Science",
        topic: "States of Matter",
        difficulty: "medium",
        questionText: "Which state of matter has a definite volume but NO fixed shape (takes the shape of its container)?",
        type: "mcq",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        correctIndex: 1,
        solutionSteps: [
          "Solids have both a fixed shape and fixed volume.",
          "Gases have neither fixed shape nor fixed volume.",
          "Liquids keep their volume constant but flow to take the shape of any container."
        ],
        hint: "Think of water: 1 liter stays 1 liter whether in a bottle or a bowl."
      },
      {
        id: "L5-MATH-005",
        subject: "Math",
        topic: "Geometry",
        difficulty: "easy",
        questionText: "An angle that measures exactly 90 degrees is called what?",
        type: "mcq",
        options: ["Acute angle", "Right angle", "Obtuse angle", "Reflex angle"],
        correctIndex: 1,
        solutionSteps: [
          "Angles less than 90° are Acute.",
          "Angles greater than 90° and less than 180° are Obtuse.",
          "An angle of exactly 90° forms an 'L' shape and is called a Right Angle."
        ],
        hint: "It looks like the corner of a square or book."
      },
      {
        id: "L5-SCI-006",
        subject: "Science",
        topic: "Simple Machines",
        difficulty: "easy",
        questionText: "A see-saw in a playground is an example of which simple machine?",
        type: "mcq",
        options: ["Pulley", "Lever", "Wheel and axle", "Screw"],
        correctIndex: 1,
        solutionSteps: [
          "A see-saw consists of a rigid board pivoting on a central point (fulcrum).",
          "This arrangement is a classic Class 1 Lever.",
          "So a see-saw is a lever."
        ],
        hint: "A rigid bar pivoting around a central point is a lever."
      },
      {
        id: "L5-MATH-007",
        subject: "Math",
        topic: "HCF",
        difficulty: "medium",
        questionText: "What is the Highest Common Factor (HCF) of 12 and 18?",
        type: "mcq",
        options: ["2", "3", "6", "12"],
        correctIndex: 2,
        solutionSteps: [
          "Factors of 12: 1, 2, 3, 4, 6, 12.",
          "Factors of 18: 1, 2, 3, 6, 9, 18.",
          "Common factors are 1, 2, 3, and 6.",
          "The highest among them is 6!"
        ],
        hint: "What is the largest number that divides both 12 and 18 without a remainder?"
      },
      {
        id: "L5-SCI-008",
        subject: "Science",
        topic: "Digestion",
        difficulty: "medium",
        questionText: "Where does the chemical digestion of carbohydrates begin in the human body?",
        type: "mcq",
        options: ["Stomach", "Mouth", "Small intestine", "Large intestine"],
        correctIndex: 1,
        solutionSteps: [
          "When we chew food, salivary glands produce saliva containing the enzyme amylase.",
          "Salivary amylase breaks down complex starches into simpler sugars right in the mouth.",
          "Digestion begins in the mouth."
        ],
        hint: "Saliva in your mouth starts breaking down food as you chew."
      },
      {
        id: "L5-MATH-009",
        subject: "Math",
        topic: "Percentages",
        difficulty: "medium",
        questionText: "What is 25% of 80?",
        type: "mcq",
        options: ["15", "20", "25", "30"],
        correctIndex: 1,
        solutionSteps: [
          "25% is one quarter: 25/100 = 1/4.",
          "To find 25% of 80, divide 80 by 4: 80 ÷ 4.",
          "80 ÷ 4 = 20."
        ],
        hint: "Divide 80 by 4."
      },
      {
        id: "L5-SCI-010",
        subject: "Science",
        topic: "Plant Reproduction",
        difficulty: "easy",
        questionText: "What are the three essential conditions required for a seed to germinate?",
        type: "mcq",
        options: [
          "Water, Air (Oxygen), and Warmth",
          "Darkness, Cold, and Fertilizer",
          "Sunlight, Ice, and Salt",
          "Wind, Rocks, and Sugar"
        ],
        correctIndex: 0,
        solutionSteps: [
          "Seeds need moisture (water) to swell and activate enzymes.",
          "They need air (oxygen) for cellular respiration.",
          "They need warmth (suitable temperature) to grow.",
          "Water, Air, and Warmth are the essential conditions."
        ],
        hint: "Remember WOW: Warmth, Oxygen, Water."
      },
      {
        id: "L5-MATH-011",
        subject: "Math",
        topic: "Angles",
        difficulty: "easy",
        questionText: "An angle measuring 45 degrees is called an:",
        type: "mcq",
        options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
        correctIndex: 0,
        solutionSteps: [
          "Angles measuring between 0° and 90° are acute angles.",
          "Since 45° is less than 90°, it is an Acute Angle.",
          "Acute angles are sharp and narrow."
        ],
        hint: "Less than 90 degrees."
      },
      {
        id: "L5-SCI-012",
        subject: "Science",
        topic: "Ecosystems",
        difficulty: "medium",
        questionText: "Animals that eat BOTH plants and other animals are called:",
        type: "mcq",
        options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
        correctIndex: 2,
        solutionSteps: [
          "Herbivores eat only plants (e.g. cow).",
          "Carnivores eat only meat/animals (e.g. lion).",
          "Omnivores eat both plants and animal flesh (e.g. bears, humans)."
        ],
        hint: "'Omni' means all or everything."
      },
      {
        id: "L5-MATH-013",
        subject: "Math",
        topic: "Fractions and Decimals",
        difficulty: "medium",
        questionText: "What is 3/4 converted into a decimal?",
        type: "mcq",
        options: ["0.34", "0.75", "0.50", "0.65"],
        correctIndex: 1,
        solutionSteps: [
          "3/4 = 3 ÷ 4.",
          "3.00 ÷ 4 = 0.75.",
          "Think of money: 3 quarters of a dollar = 75 cents = $0.75."
        ],
        hint: "Three quarters equal 75% or 0.75."
      },
      {
        id: "L5-SCI-014",
        subject: "Science",
        topic: "Skeletal System",
        difficulty: "easy",
        questionText: "How many bones are in an adult human skeleton?",
        type: "mcq",
        options: ["106", "206", "306", "406"],
        correctIndex: 1,
        solutionSteps: [
          "Babies are born with approximately 300 soft bones.",
          "As we grow, several bones fuse together.",
          "An adult human skeleton has exactly 206 bones."
        ],
        hint: "Two hundred and six."
      },
      {
        id: "L5-MATH-015",
        subject: "Math",
        topic: "Geometry",
        difficulty: "medium",
        questionText: "What is the sum of all three angles inside ANY triangle?",
        type: "mcq",
        options: ["90°", "180°", "270°", "360°"],
        correctIndex: 1,
        solutionSteps: [
          "No matter what shape of triangle you have (equilateral, isosceles, scalene),",
          "The interior angles always add up to a straight line: 180°.",
          "Sum of angles in a triangle = 180°."
        ],
        hint: "Half of a full 360° circle."
      },
      {
        id: "L5-SCI-016",
        subject: "Science",
        topic: "Atmosphere",
        difficulty: "medium",
        questionText: "Which gas is the MOST abundant in Earth's atmosphere (about 78%)?",
        type: "mcq",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correctIndex: 2,
        solutionSteps: [
          "Nitrogen makes up roughly 78% of Earth's atmosphere.",
          "Oxygen makes up about 21%.",
          "All other gases (Argon, CO2, water vapor) make up the remaining 1%."
        ],
        hint: "Nitrogen makes up nearly four-fifths of our air."
      },
      {
        id: "L5-MATH-017",
        subject: "Math",
        topic: "Volume",
        difficulty: "medium",
        questionText: "What is the volume of a cube with side length 3 cm?",
        type: "mcq",
        options: ["9 cubic cm", "18 cubic cm", "27 cubic cm", "36 cubic cm"],
        correctIndex: 2,
        solutionSteps: [
          "Volume of a cube = side × side × side.",
          "3 cm × 3 cm × 3 cm = 27 cm³.",
          "Volume = 27 cubic cm."
        ],
        hint: "3 cubed = 3 × 3 × 3."
      },
      {
        id: "L5-SCI-018",
        subject: "Science",
        topic: "States of Matter",
        difficulty: "medium",
        questionText: "What is the boiling point of pure water at normal sea-level atmospheric pressure?",
        type: "mcq",
        options: ["50°C", "80°C", "100°C", "150°C"],
        correctIndex: 2,
        solutionSteps: [
          "Water freezes at 0°C.",
          "Water boils rapidly into steam vapor at 100°C.",
          "Normal boiling point = 100°C."
        ],
        hint: "100 degrees Celsius."
      },
      {
        id: "L5-MATH-019",
        subject: "Math",
        topic: "Speed",
        difficulty: "medium",
        questionText: "A spaceship travels 300 kilometers in 3 hours. What is its speed?",
        type: "mcq",
        options: ["90 km/h", "100 km/h", "150 km/h", "300 km/h"],
        correctIndex: 1,
        solutionSteps: [
          "Speed = Distance ÷ Time.",
          "Speed = 300 km ÷ 3 hours.",
          "300 ÷ 3 = 100 km/h."
        ],
        hint: "Divide total distance by total time."
      },
      {
        id: "L5-SCI-020",
        subject: "Science",
        topic: "Deficiency Diseases",
        difficulty: "medium",
        questionText: "A severe lack of Vitamin C in the diet causes which deficiency disease?",
        type: "mcq",
        options: ["Rickets", "Scurvy", "Beriberi", "Goitre"],
        correctIndex: 1,
        solutionSteps: [
          "Vitamin C is needed to make collagen and keep gums healthy.",
          "Lack of Vitamin C causes Scurvy (bleeding gums, weakness).",
          "Citrus fruits like lemons and oranges prevent scurvy."
        ],
        hint: "Historically common among sailors without citrus fruits."
      }
    ]
  },

  // LEVEL 6: CLASS 6 (Math + Science Intro)
  {
    level: 6,
    class: "6",
    subject: "Math & Science",
    description: "Class 6: Integers, introductory algebra, ratios, food nutrients, motion & measurement, and separating mixtures.",
    questions: [
      {
        id: "L6-MATH-001",
        subject: "Math",
        topic: "Integers",
        difficulty: "medium",
        questionText: "What is the value of: (-7) + (+12)?",
        type: "mcq",
        options: ["-5", "+5", "-19", "+19"],
        correctIndex: 1,
        solutionSteps: [
          "Think of a number line starting at -7.",
          "Moving 12 units in the positive direction (right):",
          "-7 + 7 reaches 0, and we still have 5 more to move.",
          "0 + 5 = +5."
        ],
        hint: "Since 12 has the larger magnitude and is positive, the answer is positive."
      },
      {
        id: "L6-SCI-002",
        subject: "Science",
        topic: "Components of Food",
        difficulty: "easy",
        questionText: "Which nutrient group is primarily known as the 'body-building food' essential for growth and repair?",
        type: "mcq",
        options: ["Carbohydrates", "Fats", "Proteins", "Dietary fibers"],
        correctIndex: 2,
        solutionSteps: [
          "Carbohydrates and fats provide energy.",
          "Proteins are the building blocks required for muscle growth, tissue repair, and enzymes.",
          "Foods like pulses, milk, and eggs are rich in proteins."
        ],
        hint: "Bodybuilders consume this nutrient to build muscle."
      },
      {
        id: "L6-MATH-003",
        subject: "Math",
        topic: "Algebra",
        difficulty: "medium",
        questionText: "If x + 8 = 20, what is the value of x?",
        type: "mcq",
        options: ["10", "12", "14", "28"],
        correctIndex: 1,
        solutionSteps: [
          "To isolate x, subtract 8 from both sides of the equation:",
          "x = 20 - 8.",
          "x = 12."
        ],
        hint: "Subtract 8 from 20."
      },
      {
        id: "L6-SCI-004",
        subject: "Science",
        topic: "Separation of Substances",
        difficulty: "medium",
        questionText: "Which method is best suited to separate iron pins accidentally dropped in sand?",
        type: "mcq",
        options: ["Filtration", "Evaporation", "Magnetic separation", "Sedimentation"],
        correctIndex: 2,
        solutionSteps: [
          "Iron is a ferromagnetic material attracted to magnets.",
          "Sand is non-magnetic and not attracted.",
          "Passing a magnet over the mixture quickly picks up all iron pins via Magnetic Separation."
        ],
        hint: "Iron sticks to magnets."
      },
      {
        id: "L6-MATH-005",
        subject: "Math",
        topic: "Ratio and Proportion",
        difficulty: "medium",
        questionText: "What is the simplest form of the ratio 15 : 25?",
        type: "mcq",
        options: ["1 : 2", "3 : 5", "5 : 3", "2 : 3"],
        correctIndex: 1,
        solutionSteps: [
          "Find the greatest common divisor of 15 and 25, which is 5.",
          "Divide both terms by 5: 15 ÷ 5 = 3 and 25 ÷ 5 = 5.",
          "The ratio in simplest form is 3 : 5."
        ],
        hint: "Divide both 15 and 25 by 5."
      },
      {
        id: "L6-SCI-006",
        subject: "Science",
        topic: "Motion and Measurement",
        difficulty: "medium",
        questionText: "The motion of the pendulum of a clock swinging back and forth is an example of:",
        type: "mcq",
        options: ["Rectilinear motion", "Periodic motion", "Circular motion", "Random motion"],
        correctIndex: 1,
        solutionSteps: [
          "A motion that repeats itself at regular intervals of time is called Periodic Motion.",
          "A clock's pendulum swings to and fro with a fixed time period.",
          "Therefore, it exhibits periodic motion."
        ],
        hint: "It repeats itself at regular time intervals."
      },
      {
        id: "L6-MATH-007",
        subject: "Math",
        topic: "Integers",
        difficulty: "medium",
        questionText: "What is (-4) × (-3)?",
        type: "mcq",
        options: ["-12", "+12", "-7", "+7"],
        correctIndex: 1,
        solutionSteps: [
          "Multiplying two negative numbers always yields a positive result.",
          "Negative × Negative = Positive.",
          "4 × 3 = 12, so (-4) × (-3) = +12."
        ],
        hint: "Two negatives multiply to make a positive."
      },
      {
        id: "L6-SCI-008",
        subject: "Science",
        topic: "Living Organisms",
        difficulty: "medium",
        questionText: "Which adaptation helps birds to fly easily in air?",
        type: "mcq",
        options: [
          "Solid heavy bones and thick fur",
          "Hollow light bones and streamlined body",
          "Broad flat webbed feet",
          "Gills and fins"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Birds have pneumatic (hollow) bones that minimize body weight.",
          "Their streamlined spindle-shaped body reduces air resistance during flight.",
          "Forelimbs are modified into wings for lift."
        ],
        hint: "Light bones with air cavities."
      },
      {
        id: "L6-MATH-009",
        subject: "Math",
        topic: "Algebra",
        difficulty: "medium",
        questionText: "Solve for y: 3y = 27.",
        type: "mcq",
        options: ["6", "7", "8", "9"],
        correctIndex: 3,
        solutionSteps: [
          "3y means 3 multiplied by y.",
          "Divide both sides by 3: y = 27 ÷ 3.",
          "y = 9."
        ],
        hint: "27 divided by 3."
      },
      {
        id: "L6-SCI-010",
        subject: "Science",
        topic: "Electricity",
        difficulty: "easy",
        questionText: "A device that is used to easily open or close an electric circuit is called a:",
        type: "mcq",
        options: ["Battery", "Switch", "Filament", "Insulator"],
        correctIndex: 1,
        solutionSteps: [
          "When the switch is ON, the circuit is closed and current flows.",
          "When the switch is OFF, the circuit is open (broken) and current stops.",
          "A switch controls the circuit flow."
        ],
        hint: "You flip it on the wall to turn a light bulb on or off."
      },
      {
        id: "L6-MATH-011",
        subject: "Math",
        topic: "Decimals",
        difficulty: "medium",
        questionText: "What is 0.05 + 0.95?",
        type: "mcq",
        options: ["0.90", "1.00", "0.10", "1.10"],
        correctIndex: 1,
        solutionSteps: [
          "Align decimals: 5 hundredths + 95 hundredths = 100 hundredths.",
          "100/100 = 1.00.",
          "The sum is 1.00."
        ],
        hint: "5 cents plus 95 cents makes 1 dollar."
      },
      {
        id: "L6-SCI-012",
        subject: "Science",
        topic: "Fibre to Fabric",
        difficulty: "medium",
        questionText: "Which of the following is a NATURAL plant fibre?",
        type: "mcq",
        options: ["Nylon", "Cotton", "Polyester", "Acrylic"],
        correctIndex: 1,
        solutionSteps: [
          "Nylon, polyester, and acrylic are synthetic fibres synthesized from chemicals.",
          "Cotton is harvested directly from the cotton bolls of cotton plants.",
          "Therefore, cotton is a natural plant fibre."
        ],
        hint: "Grown in fields from cotton plants."
      },
      {
        id: "L6-MATH-013",
        subject: "Math",
        topic: "Fractions",
        difficulty: "medium",
        questionText: "Which is the proper fraction?",
        type: "mcq",
        options: ["7/4", "3/5", "9/2", "5/5"],
        correctIndex: 1,
        solutionSteps: [
          "In a proper fraction, the numerator (top) is strictly less than the denominator (bottom).",
          "In 3/5, 3 is less than 5, so it is a proper fraction.",
          "7/4 and 9/2 are improper fractions."
        ],
        hint: "The top number must be smaller than the bottom number."
      },
      {
        id: "L6-SCI-014",
        subject: "Science",
        topic: "Light and Shadows",
        difficulty: "easy",
        questionText: "Objects through which we cannot see at all are called:",
        type: "mcq",
        options: ["Transparent", "Translucent", "Opaque", "Reflective"],
        correctIndex: 2,
        solutionSteps: [
          "Transparent objects let all light pass through (clear glass).",
          "Translucent objects let partial light pass (tracing paper).",
          "Opaque objects completely block light and cast dark shadows (wood, metal)."
        ],
        hint: "They cast solid shadows because light cannot pass through them."
      },
      {
        id: "L6-MATH-015",
        subject: "Math",
        topic: "Geometry",
        difficulty: "medium",
        questionText: "How many degrees are in a full circular turn?",
        type: "mcq",
        options: ["90°", "180°", "270°", "360°"],
        correctIndex: 3,
        solutionSteps: [
          "A quarter turn is 90°.",
          "A half turn (straight line) is 180°.",
          "A full complete circle rotation is 360°."
        ],
        hint: "360 degrees in a full circle."
      },
      {
        id: "L6-SCI-016",
        subject: "Science",
        topic: "Nutrient Deficiency",
        difficulty: "medium",
        questionText: "Deficiency of Iron in our daily food causes which condition?",
        type: "mcq",
        options: ["Goitre", "Anaemia", "Rickets", "Scurvy"],
        correctIndex: 1,
        solutionSteps: [
          "Iron is a vital component of hemoglobin, which carries oxygen in red blood cells.",
          "Low iron levels lead to reduced hemoglobin, causing fatigue and paleness.",
          "This condition is known as Anaemia."
        ],
        hint: "Lack of red blood cells / hemoglobin."
      },
      {
        id: "L6-MATH-017",
        subject: "Math",
        topic: "Ratio",
        difficulty: "medium",
        questionText: "If the ratio of boys to girls in a class is 2:3 and there are 10 boys, how many girls are there?",
        type: "mcq",
        options: ["12", "15", "18", "20"],
        correctIndex: 1,
        solutionSteps: [
          "Ratio boys : girls = 2 : 3.",
          "2 units = 10 boys, so 1 unit = 10 ÷ 2 = 5.",
          "Girls = 3 units = 3 × 5 = 15 girls."
        ],
        hint: "Multiply each part of 2:3 by 5."
      },
      {
        id: "L6-SCI-018",
        subject: "Science",
        topic: "Changes Around Us",
        difficulty: "easy",
        questionText: "Which of the following is an IRREVERSIBLE change?",
        type: "mcq",
        options: ["Melting of ice", "Boiling of water", "Burning of paper", "Stretching of a rubber band"],
        correctIndex: 2,
        solutionSteps: [
          "Melted ice can be frozen back, boiled water condenses back, rubber bands return to shape.",
          "Burning paper turns it to ash, smoke, and gas; it can never be unburned.",
          "Burning paper is an irreversible chemical change."
        ],
        hint: "Once burned, you cannot get the paper back."
      },
      {
        id: "L6-MATH-019",
        subject: "Math",
        topic: "Integers",
        difficulty: "medium",
        questionText: "Which integer is greater: -15 or -3?",
        type: "mcq",
        options: ["-15", "-3", "Both are equal", "0"],
        correctIndex: 1,
        solutionSteps: [
          "On the negative side of the number line, numbers closer to 0 have higher value.",
          "-3 is only 3 steps left of 0, while -15 is 15 steps left.",
          "-3 is greater than -15: -3 > -15."
        ],
        hint: "Being 3 meters underwater is higher than 15 meters underwater."
      },
      {
        id: "L6-SCI-020",
        subject: "Science",
        topic: "Water",
        difficulty: "medium",
        questionText: "Tiny droplets of water condensing on cold surfaces in winter mornings are called:",
        type: "mcq",
        options: ["Fog", "Dew", "Hail", "Frost"],
        correctIndex: 1,
        solutionSteps: [
          "During cool nights, surfaces like grass and leaves lose heat rapidly.",
          "Moist air touching these cold surfaces cools below its dew point, condensing into water drops.",
          "These droplets are called dew."
        ],
        hint: "Morning dew on fresh leaves."
      }
    ]
  },

  // LEVEL 7: CLASS 7 (Math, Physics, Chemistry, Biology)
  {
    level: 7,
    class: "7",
    subject: "Full Science & Math",
    description: "Class 7: Rational numbers, linear equations, heat transfer, speed & motion, acids & bases, and plant/animal nutrition.",
    questions: [
      {
        id: "L7-PHY-001",
        subject: "Physics",
        topic: "Heat Transfer",
        difficulty: "medium",
        questionText: "By which method does heat transfer through solid metals like a silver spoon?",
        type: "mcq",
        options: ["Convection", "Conduction", "Radiation", "Evaporation"],
        correctIndex: 1,
        solutionSteps: [
          "In solids, atoms are packed tightly in fixed lattice positions.",
          "Heat vibrates atoms, passing thermal kinetic energy directly to neighboring atoms without atoms moving from place to place.",
          "This mode of heat transfer is called Conduction."
        ],
        hint: "Conduction occurs primarily in solids via particle-to-particle collisions."
      },
      {
        id: "L7-CHEM-002",
        subject: "Chemistry",
        topic: "Acids and Bases",
        difficulty: "medium",
        questionText: "What color does blue litmus paper turn when dipped into an acidic solution like lemon juice?",
        type: "mcq",
        options: ["Yellow", "Red", "Green", "Colorless"],
        correctIndex: 1,
        solutionSteps: [
          "Litmus is a natural indicator obtained from lichens.",
          "Acids turn blue litmus paper RED.",
          "Bases turn red litmus paper BLUE.",
          "Lemon juice is acidic (citric acid), so it turns blue litmus red."
        ],
        hint: "Remember: Acid turns litmus Red (A-R)."
      },
      {
        id: "L7-BIO-003",
        subject: "Biology",
        topic: "Nutrition in Plants",
        difficulty: "medium",
        questionText: "What gas is released into the atmosphere as a byproduct of photosynthesis?",
        type: "mcq",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Methane"],
        correctIndex: 2,
        solutionSteps: [
          "During photosynthesis, plants take in 6CO2 and 6H2O using light energy.",
          "Water molecules are split in photolysis.",
          "The chemical reaction produces glucose (C6H12O6) and releases Oxygen (O2) gas."
        ],
        hint: "The vital gas that animals and humans breathe."
      },
      {
        id: "L7-MATH-004",
        subject: "Math",
        topic: "Linear Equations",
        difficulty: "medium",
        questionText: "Solve the linear equation: 2x - 5 = 11.",
        type: "mcq",
        options: ["x = 6", "x = 8", "x = 3", "x = 16"],
        correctIndex: 1,
        solutionSteps: [
          "Add 5 to both sides: 2x = 11 + 5 = 16.",
          "Divide both sides by 2: x = 16 ÷ 2.",
          "x = 8."
        ],
        hint: "Add 5 to 11 first, then divide by 2."
      },
      {
        id: "L7-PHY-005",
        subject: "Physics",
        topic: "Motion and Time",
        difficulty: "medium",
        questionText: "A high-speed train travels 240 kilometers in 2 hours. What is its speed?",
        type: "mcq",
        options: ["100 km/h", "120 km/h", "140 km/h", "480 km/h"],
        correctIndex: 1,
        solutionSteps: [
          "Formula for speed: Speed = Distance ÷ Time.",
          "Speed = 240 km ÷ 2 h = 120 km/h.",
          "The train's speed is 120 km/h."
        ],
        hint: "Distance divided by time."
      },
      {
        id: "L7-CHEM-006",
        subject: "Chemistry",
        topic: "Neutralization",
        difficulty: "medium",
        questionText: "What are the two products formed when an acid reacts with a base in a neutralization reaction?",
        type: "mcq",
        options: ["Hydrogen and Oxygen", "Salt and Water", "Carbon and Nitrogen", "Sugar and Acid"],
        correctIndex: 1,
        solutionSteps: [
          "Neutralization occurs when H+ ions from acid combine with OH- ions from base.",
          "H+ + OH- forms neutral water (H2O).",
          "The remaining ions combine to form a chemical Salt.",
          "Acid + Base → Salt + Water (+ heat)."
        ],
        hint: "Acid + Base = Salt + Water."
      },
      {
        id: "L7-BIO-007",
        subject: "Biology",
        topic: "Nutrition in Animals",
        difficulty: "medium",
        questionText: "Which digestive organ produces bile juice to break down and emulsify fats?",
        type: "mcq",
        options: ["Stomach", "Pancreas", "Liver", "Large intestine"],
        correctIndex: 2,
        solutionSteps: [
          "The liver is the largest internal gland in the human body.",
          "It secretes bile juice, which is temporarily stored in the gall bladder.",
          "Bile breaks large fat globules into tiny droplets (emulsification)."
        ],
        hint: "The largest gland in the body."
      },
      {
        id: "L7-MATH-008",
        subject: "Math",
        topic: "Rational Numbers",
        difficulty: "medium",
        questionText: "What is (-3/7) + (5/7)?",
        type: "mcq",
        options: ["-2/7", "2/7", "8/7", "2/14"],
        correctIndex: 1,
        solutionSteps: [
          "Since the denominators are equal (7), add the numerators directly:",
          "(-3) + 5 = +2.",
          "Result = 2/7."
        ],
        hint: "(-3 + 5) over 7."
      },
      {
        id: "L7-PHY-009",
        subject: "Physics",
        topic: "Radiation",
        difficulty: "medium",
        questionText: "How does solar heat travel from the Sun across the vacuum of outer space to reach Earth?",
        type: "mcq",
        options: ["Conduction", "Convection", "Radiation", "Advection"],
        correctIndex: 2,
        solutionSteps: [
          "Conduction and convection require material mediums (particles) to transfer thermal energy.",
          "Outer space is a near-perfect vacuum with virtually no particles.",
          "Thermal energy travels through vacuum as electromagnetic waves via Radiation."
        ],
        hint: "Electromagnetic infrared waves travel through empty space."
      },
      {
        id: "L7-CHEM-010",
        subject: "Chemistry",
        topic: "Physical and Chemical Changes",
        difficulty: "medium",
        questionText: "Rusting of iron in the presence of moisture and air is a:",
        type: "mcq",
        options: ["Physical change", "Chemical change", "Reversible change", "Nuclear change"],
        correctIndex: 1,
        solutionSteps: [
          "Iron reacts with oxygen and moisture to form iron oxide (hydrated iron(III) oxide, Fe2O3·xH2O).",
          "A completely new substance with different properties is formed, releasing heat.",
          "This is a permanent Chemical Change."
        ],
        hint: "A new substance (iron oxide) is formed."
      },
      {
        id: "L7-BIO-011",
        subject: "Biology",
        topic: "Transportation in Plants",
        difficulty: "medium",
        questionText: "Which vascular tissue transports water and dissolved minerals from roots upward to leaves?",
        type: "mcq",
        options: ["Phloem", "Xylem", "Cortex", "Epidermis"],
        correctIndex: 1,
        solutionSteps: [
          "Xylem tissue forms continuous tubular channels from roots through stems to leaves.",
          "It transports water and inorganic minerals upwards via transpiration pull.",
          "(Phloem transports prepared food sugars)."
        ],
        hint: "Xylem carries water (Xy = Water)."
      },
      {
        id: "L7-MATH-012",
        subject: "Math",
        topic: "Exponents",
        difficulty: "medium",
        questionText: "What is the value of 3⁴?",
        type: "mcq",
        options: ["12", "27", "81", "64"],
        correctIndex: 2,
        solutionSteps: [
          "3⁴ means 3 multiplied by itself 4 times:",
          "3 × 3 = 9.",
          "9 × 3 = 27.",
          "27 × 3 = 81."
        ],
        hint: "3 × 3 × 3 × 3 = ?"
      },
      {
        id: "L7-PHY-013",
        subject: "Physics",
        topic: "Optics",
        difficulty: "medium",
        questionText: "What type of mirror is commonly used as a side rear-view mirror in motor vehicles?",
        type: "mcq",
        options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic mirror"],
        correctIndex: 1,
        solutionSteps: [
          "Convex mirrors always form erect, virtual, and diminished (smaller) images of distant objects.",
          "Because the images are smaller, convex mirrors provide a much wider field of view.",
          "This allows drivers to see more traffic behind them."
        ],
        hint: "A mirror that curves outward to give a wide field of view."
      },
      {
        id: "L7-CHEM-014",
        subject: "Chemistry",
        topic: "Bases",
        difficulty: "medium",
        questionText: "Which of the following is commonly known as baking soda?",
        type: "mcq",
        options: ["Sodium chloride", "Sodium hydrogen carbonate", "Calcium hydroxide", "Magnesium hydroxide"],
        correctIndex: 1,
        solutionSteps: [
          "Baking soda is a mild alkaline salt used in baking to release CO2.",
          "Its chemical formula is NaHCO3.",
          "Its chemical name is Sodium hydrogen carbonate (or sodium bicarbonate)."
        ],
        hint: "NaHCO3."
      },
      {
        id: "L7-BIO-015",
        subject: "Biology",
        topic: "Respiration in Organisms",
        difficulty: "medium",
        questionText: "Earthworms breathe and exchange respiratory gases through their:",
        type: "mcq",
        options: ["Lungs", "Moist skin", "Tracheae", "Gills"],
        correctIndex: 1,
        solutionSteps: [
          "Earthworms do not have specialized lungs or gills.",
          "Gases diffuse directly through their thin, moist skin into superficial blood capillaries.",
          "Hence, they breathe through their moist skin."
        ],
        hint: "They keep their slimy skin moist to absorb oxygen directly."
      },
      {
        id: "L7-MATH-016",
        subject: "Math",
        topic: "Triangles",
        difficulty: "medium",
        questionText: "In a right-angled triangle, if two angles are 90° and 35°, what is the third angle?",
        type: "mcq",
        options: ["45°", "55°", "65°", "35°"],
        correctIndex: 1,
        solutionSteps: [
          "Sum of angles in any triangle = 180°.",
          "Third angle = 180° - (90° + 35°).",
          "180° - 125° = 55°."
        ],
        hint: "Subtract (90 + 35) from 180."
      },
      {
        id: "L7-PHY-017",
        subject: "Physics",
        topic: "Electric Current",
        difficulty: "medium",
        questionText: "Which safety device melts and breaks an electric circuit when excessive current flows through it?",
        type: "mcq",
        options: ["Resistor", "Fuse", "Capacitor", "Inductor"],
        correctIndex: 1,
        solutionSteps: [
          "An electric fuse has a wire with a low melting point.",
          "When current exceeds the safe threshold, Joule heating warms the wire past its melting point.",
          "The wire melts, breaking the circuit and preventing fires or appliance damage."
        ],
        hint: "It contains a thin wire designed to melt safely during power surges."
      },
      {
        id: "L7-CHEM-018",
        subject: "Chemistry",
        topic: "Indicators",
        difficulty: "medium",
        questionText: "Turmeric is a natural indicator. What color does turmeric turn in an alkaline (basic) solution?",
        type: "mcq",
        options: ["Remains yellow", "Turns deep red", "Turns bright blue", "Turns green"],
        correctIndex: 1,
        solutionSteps: [
          "Turmeric paste is yellow in neutral or acidic solutions.",
          "When it comes into contact with a basic solution (such as soap or baking soda), it undergoes a color change to reddish-brown.",
          "Turns deep reddish-brown."
        ],
        hint: "Have you ever scrubbed a yellow curry stain with soap? It turns reddish."
      },
      {
        id: "L7-BIO-019",
        subject: "Biology",
        topic: "Circulation",
        difficulty: "medium",
        questionText: "Which blood cells are primarily responsible for fighting infections and disease-causing pathogens?",
        type: "mcq",
        options: ["Red Blood Cells", "Platelets", "White Blood Cells", "Plasma"],
        correctIndex: 2,
        solutionSteps: [
          "Red blood cells transport oxygen via hemoglobin.",
          "Platelets assist in blood clotting.",
          "White blood cells (leukocytes) produce antibodies and engulf harmful bacteria/viruses to fight disease."
        ],
        hint: "Leukocytes, also known as WBCs."
      },
      {
        id: "L7-MATH-020",
        subject: "Math",
        topic: "Simple Interest",
        difficulty: "medium",
        questionText: "What is the Simple Interest on a principal of ₹1,000 at 10% per annum for 2 years?",
        type: "mcq",
        options: ["₹100", "₹150", "₹200", "₹250"],
        correctIndex: 2,
        solutionSteps: [
          "Simple Interest formula: SI = (P × R × T) ÷ 100.",
          "SI = (1000 × 10 × 2) ÷ 100.",
          "SI = 20,000 ÷ 100 = ₹200."
        ],
        hint: "(Principal × Rate × Time) / 100."
      }
    ]
  },

  // LEVEL 8: CLASS 8 (Full Syllabus: Math, Physics, Chemistry, Biology)
  {
    level: 8,
    class: "8",
    subject: "Full Science & Math",
    description: "Class 8: Linear equations, exponents, force & pressure, friction, sound, metals & non-metals, and cell structure.",
    questions: [
      {
        id: "L8-PHY-001",
        subject: "Physics",
        topic: "Force and Pressure",
        difficulty: "medium",
        questionText: "A force applied on a smaller area produces greater pressure. If a nail has a sharp pointed tip, why does it pierce a surface easily?",
        type: "mcq",
        options: [
          "Because the area of the tip is very small, increasing pressure",
          "Because the nail is heavier than the surface",
          "Because pressure decreases with force",
          "Because the tip has no mass"
        ],
        correctIndex: 0,
        solutionSteps: [
          "Pressure = Force ÷ Area.",
          "A sharp nail tip has a very small contact surface area.",
          "The same driving force applied over a tiny area produces tremendously high pressure.",
          "That high pressure penetrates wood or plaster effortlessly."
        ],
        hint: "Pressure is inversely proportional to area (P = F/A)."
      },
      {
        id: "L8-CHEM-002",
        subject: "Chemistry",
        topic: "Metals and Non-Metals",
        difficulty: "medium",
        questionText: "Which unique property allows metals like gold and aluminum to be beaten into thin sheets without breaking?",
        type: "mcq",
        options: ["Ductility", "Malleability", "Sonorousness", "Lustre"],
        correctIndex: 1,
        solutionSteps: [
          "Ductility is the property allowing metals to be drawn into thin wires.",
          "Malleability is the ability to be hammered or rolled into thin sheets (like aluminum foil).",
          "Therefore, the property is Malleability."
        ],
        hint: "Beaten into sheets = Malleable; drawn into wires = Ductile."
      },
      {
        id: "L8-BIO-003",
        subject: "Biology",
        topic: "Cell Structure",
        difficulty: "medium",
        questionText: "Which organelle is universally known as the 'Powerhouse of the Cell' because it generates ATP through cellular respiration?",
        type: "mcq",
        options: ["Ribosome", "Golgi apparatus", "Mitochondrion", "Lysosome"],
        correctIndex: 2,
        solutionSteps: [
          "Cells require biochemical energy to carry out metabolic processes.",
          "Mitochondria oxidize nutrients to synthesize Adenosine Triphosphate (ATP), the chemical energy currency.",
          "Hence, the mitochondrion is the cell's powerhouse."
        ],
        hint: "Starts with M and produces ATP."
      },
      {
        id: "L8-MATH-004",
        subject: "Math",
        topic: "Exponents and Powers",
        difficulty: "medium",
        questionText: "Simplify: 2³ × 2⁴.",
        type: "mcq",
        options: ["2⁷ (which is 128)", "2¹²", "4⁷", "4¹²"],
        correctIndex: 0,
        solutionSteps: [
          "According to exponential law of multiplication with identical bases:",
          "aᵐ × aⁿ = aᵐ⁺ⁿ.",
          "Here, 2³ × 2⁴ = 2³⁺⁴ = 2⁷.",
          "2⁷ = 128."
        ],
        hint: "When multiplying identical bases, add the exponents."
      },
      {
        id: "L8-PHY-005",
        subject: "Physics",
        topic: "Friction",
        difficulty: "medium",
        questionText: "Why do vehicle tires and athletic shoes have grooved treads on their soles?",
        type: "mcq",
        options: [
          "To reduce weight",
          "To increase friction and prevent slipping",
          "To decrease rolling friction to zero",
          "To absorb water into the shoe"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Smooth rubber slips easily on wet or dusty surfaces.",
          "Grooved treads interlock with microscopic surface irregularities.",
          "This increases friction with the ground, providing secure grip and braking control."
        ],
        hint: "Treads increase traction (friction)."
      },
      {
        id: "L8-CHEM-006",
        subject: "Chemistry",
        topic: "Combustion",
        difficulty: "medium",
        questionText: "Which gas is an essential supporter of combustion, without which ordinary fuels cannot burn?",
        type: "mcq",
        options: ["Nitrogen", "Carbon dioxide", "Oxygen", "Helium"],
        correctIndex: 2,
        solutionSteps: [
          "Combustion is an exothermic chemical oxidation reaction.",
          "Fuel reacts with Oxygen in the presence of activation heat.",
          "Without Oxygen gas, fire immediately extinguishes."
        ],
        hint: "Covering a burning candle with a glass cuts off this gas and puts out the flame."
      },
      {
        id: "L8-BIO-007",
        subject: "Biology",
        topic: "Cell Structure",
        difficulty: "medium",
        questionText: "Which cell structure is present in plant cells for structural rigidity, but entirely absent in animal cells?",
        type: "mcq",
        options: ["Plasma membrane", "Cell wall", "Mitochondria", "Nucleus"],
        correctIndex: 1,
        solutionSteps: [
          "Both plant and animal cells possess a flexible plasma membrane, nucleus, and mitochondria.",
          "Plant cells have an outer rigid layer composed of cellulose called the Cell Wall.",
          "Animal cells lack a cell wall."
        ],
        hint: "It gives plants their rigid, upright structure."
      },
      {
        id: "L8-MATH-008",
        subject: "Math",
        topic: "Mensuration",
        difficulty: "medium",
        questionText: "What is the total surface area of a cube with edge length 4 cm?",
        type: "mcq",
        options: ["64 cm²", "96 cm²", "16 cm²", "32 cm²"],
        correctIndex: 1,
        solutionSteps: [
          "A cube has 6 identical square faces.",
          "Area of one face = edge² = 4² = 16 cm².",
          "Total Surface Area = 6 × edge² = 6 × 16 = 96 cm²."
        ],
        hint: "6 faces × (4 × 4)."
      },
      {
        id: "L8-PHY-009",
        subject: "Physics",
        topic: "Sound",
        difficulty: "medium",
        questionText: "The pitch (shrillness or gravity) of a sound is determined by its:",
        type: "mcq",
        options: ["Amplitude", "Frequency", "Loudness", "Speed"],
        correctIndex: 1,
        solutionSteps: [
          "Loudness is determined by the amplitude of vibration.",
          "Pitch (how high or low a note sounds) is determined by Frequency (vibrations per second).",
          "Higher frequency creates a higher-pitched sound."
        ],
        hint: "Frequency = Pitch, Amplitude = Loudness."
      },
      {
        id: "L8-CHEM-010",
        subject: "Chemistry",
        topic: "Metals",
        difficulty: "medium",
        questionText: "Which metal is liquid at room temperature (around 25°C)?",
        type: "mcq",
        options: ["Iron", "Mercury", "Copper", "Lead"],
        correctIndex: 1,
        solutionSteps: [
          "Almost all metals are hard solids at room temperature.",
          "Mercury (Hg) is the singular metallic element that remains liquid at standard room conditions.",
          "Because it expands uniformly, it is used in glass thermometers."
        ],
        hint: "The silvery liquid metal in traditional thermometers."
      },
      {
        id: "L8-BIO-011",
        subject: "Biology",
        topic: "Microorganisms",
        difficulty: "medium",
        questionText: "Which bacterium is responsible for fermenting milk into curd (yogurt)?",
        type: "mcq",
        options: ["Lactobacillus", "Rhizobium", "Streptococcus", "E. coli"],
        correctIndex: 0,
        solutionSteps: [
          "Milk contains a sugar called lactose.",
          "Lactobacillus bacteria convert lactose into lactic acid.",
          "Lactic acid coagulates milk proteins (casein), turning milk into thick curd."
        ],
        hint: "'Lacto' refers to milk."
      },
      {
        id: "L8-MATH-012",
        subject: "Math",
        topic: "Square Roots",
        difficulty: "medium",
        questionText: "What is the square root of 144 (√144)?",
        type: "mcq",
        options: ["11", "12", "13", "14"],
        correctIndex: 1,
        solutionSteps: [
          "The square root asks: which number multiplied by itself equals 144?",
          "12 × 12 = 144.",
          "Therefore, √144 = 12."
        ],
        hint: "12 squared is 144."
      },
      {
        id: "L8-PHY-013",
        subject: "Physics",
        topic: "Electrostatics",
        difficulty: "medium",
        questionText: "Like electric charges (e.g. positive and positive) ________ each other, while opposite charges ________.",
        type: "mcq",
        options: ["Attract; Repel", "Repel; Attract", "Destroy; Create", "Neutralize; Repel"],
        correctIndex: 1,
        solutionSteps: [
          "Fundamental law of electrostatics:",
          "Like charges push away from one another (Repel).",
          "Opposite charges (+ and -) pull toward one another (Attract)."
        ],
        hint: "Opposites attract, likes repel."
      },
      {
        id: "L8-CHEM-014",
        subject: "Chemistry",
        topic: "Non-Metals",
        difficulty: "medium",
        questionText: "Which non-metal is an essential component of fertilizers and promotes healthy leafy plant growth?",
        type: "mcq",
        options: ["Nitrogen", "Helium", "Neon", "Argon"],
        correctIndex: 0,
        solutionSteps: [
          "Plants require NPK nutrients (Nitrogen, Phosphorus, Potassium).",
          "Nitrogen is synthesized into urea fertilizers.",
          "It promotes rapid vegetative and leafy growth."
        ],
        hint: "The N in NPK fertilizer."
      },
      {
        id: "L8-BIO-015",
        subject: "Biology",
        topic: "Reproduction in Animals",
        difficulty: "medium",
        questionText: "Amoeba reproduces asexually by dividing into two identical daughter cells. This process is called:",
        type: "mcq",
        options: ["Budding", "Binary fission", "Spore formation", "Regeneration"],
        correctIndex: 1,
        solutionSteps: [
          "Binary means two; fission means splitting apart.",
          "The single-celled Amoeba replicates its genetic material and divides its nucleus (karyokinesis) and cytoplasm (cytokinesis).",
          "This forms 2 equal daughter cells: Binary Fission."
        ],
        hint: "Binary = two, fission = splitting."
      },
      {
        id: "L8-MATH-016",
        subject: "Math",
        topic: "Linear Equations",
        difficulty: "medium",
        questionText: "Solve: 5x + 3 = 2x + 15.",
        type: "mcq",
        options: ["x = 2", "x = 3", "x = 4", "x = 5"],
        correctIndex: 2,
        solutionSteps: [
          "Subtract 2x from both sides: 5x - 2x + 3 = 15 => 3x + 3 = 15.",
          "Subtract 3 from both sides: 3x = 15 - 3 = 12.",
          "Divide by 3: x = 12 ÷ 3 = 4."
        ],
        hint: "Bring x terms to the left: 3x = 12."
      },
      {
        id: "L8-PHY-017",
        subject: "Physics",
        topic: "Pressure",
        difficulty: "medium",
        questionText: "What instrument is used to measure atmospheric pressure?",
        type: "mcq",
        options: ["Thermometer", "Barometer", "Speedometer", "Ammeter"],
        correctIndex: 1,
        solutionSteps: [
          "Thermometers measure temperature.",
          "Ammeters measure electric current.",
          "Barometers (mercury or aneroid) measure atmospheric pressure.",
          "Correct device is the Barometer."
        ],
        hint: "'Baro' refers to pressure (like bar)."
      },
      {
        id: "L8-CHEM-018",
        subject: "Chemistry",
        topic: "Synthetic Fibres",
        difficulty: "medium",
        questionText: "Which was the first fully synthetic fibre made entirely without any natural plant or animal raw material?",
        type: "mcq",
        options: ["Rayon", "Nylon", "Cotton", "Wool"],
        correctIndex: 1,
        solutionSteps: [
          "Rayon is regenerated cellulose from wood pulp (semi-synthetic).",
          "Nylon was synthesized in 1931 from coal, water, and air without natural agricultural raw materials.",
          "It is the first fully synthetic polymer fibre."
        ],
        hint: "Strong synthetic fibre named after New York and London."
      },
      {
        id: "L8-BIO-019",
        subject: "Biology",
        topic: "Conservation",
        difficulty: "easy",
        questionText: "The book that keeps an official record of all endangered plants and animals globally is called the:",
        type: "mcq",
        options: ["Green Data Book", "Red Data Book", "Blue Data Book", "Yellow Journal"],
        correctIndex: 1,
        solutionSteps: [
          "Maintained by IUCN (International Union for Conservation of Nature).",
          "It catalogues taxa threatened with extinction.",
          "It is designated as the Red Data Book."
        ],
        hint: "Red signifies danger and warning."
      },
      {
        id: "L8-MATH-020",
        subject: "Math",
        topic: "Volume",
        difficulty: "medium",
        questionText: "What is the volume of a cylinder with radius 7 cm and height 10 cm? (Use π = 22/7)",
        type: "mcq",
        options: ["1440 cm³", "1540 cm³", "1640 cm³", "700 cm³"],
        correctIndex: 1,
        solutionSteps: [
          "Volume of cylinder = π × r² × h.",
          "r² = 7 × 7 = 49.",
          "Volume = (22/7) × 49 × 10.",
          "22 × 7 × 10 = 154 × 10 = 1540 cm³."
        ],
        hint: "π × r² × h: (22/7) × 49 × 10."
      }
    ]
  },

  // LEVEL 9: CLASS 9 (Full Syllabus: Math, Physics, Chemistry, Biology)
  {
    level: 9,
    class: "9",
    subject: "Full Science & Math",
    description: "Class 9: Polynomials, coordinate geometry, laws of motion, gravitation, atoms & molecules, and cell tissues.",
    questions: [
      {
        id: "L9-PHY-001",
        subject: "Physics",
        topic: "Laws of Motion",
        difficulty: "medium",
        questionText: "According to Newton's Second Law of Motion, the rate of change of momentum is directly proportional to the applied force. What is the mathematical formula?",
        type: "mcq",
        options: ["F = m / a", "F = m × a", "F = m × v²", "F = a / m"],
        correctIndex: 1,
        solutionSteps: [
          "Momentum p = m × v.",
          "Rate of change of momentum = d(mv)/dt = m(dv/dt) = m × a.",
          "Applied Force F = mass × acceleration (F = ma).",
          "Correct formula: F = m × a."
        ],
        hint: "Force equals mass multiplied by acceleration."
      },
      {
        id: "L9-CHEM-002",
        subject: "Chemistry",
        topic: "Atoms and Molecules",
        difficulty: "medium",
        questionText: "What is the molecular mass of water (H₂O)? (Atomic masses: H = 1 u, O = 16 u)",
        type: "mcq",
        options: ["17 u", "18 u", "20 u", "34 u"],
        correctIndex: 1,
        solutionSteps: [
          "Water molecule contains 2 Hydrogen atoms and 1 Oxygen atom.",
          "Mass of 2 Hydrogens = 2 × 1 u = 2 u.",
          "Mass of 1 Oxygen = 1 × 16 u = 16 u.",
          "Total Molecular Mass = 2 u + 16 u = 18 u."
        ],
        hint: "2(1) + 16 = ?"
      },
      {
        id: "L9-BIO-003",
        subject: "Biology",
        topic: "Tissues",
        difficulty: "medium",
        questionText: "Which complex permanent tissue in vascular plants conducts synthesized organic food (sugars) bidirectionally from leaves to all other organs?",
        type: "mcq",
        options: ["Xylem", "Phloem", "Parenchyma", "Collenchyma"],
        correctIndex: 1,
        solutionSteps: [
          "Xylem transports water and inorganic minerals unidirectionally upwards.",
          "Phloem comprises sieve tubes, companion cells, and phloem parenchyma.",
          "It transports photosynthesized sucrose solutions bidirectionally.",
          "Tissue = Phloem."
        ],
        hint: "Phloem transports food (Ph = Food)."
      },
      {
        id: "L9-MATH-004",
        subject: "Math",
        topic: "Coordinate Geometry",
        difficulty: "easy",
        questionText: "In the Cartesian coordinate system, which quadrant contains the point (-4, 5)?",
        type: "mcq",
        options: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
        correctIndex: 1,
        solutionSteps: [
          "In Quadrant I: x > 0, y > 0 (+, +).",
          "In Quadrant II: x < 0, y > 0 (-, +).",
          "In Quadrant III: x < 0, y < 0 (-, -).",
          "In Quadrant IV: x > 0, y < 0 (+, -).",
          "Here x = -4 (negative) and y = 5 (positive), which lies in Quadrant II."
        ],
        hint: "Negative x and positive y is Quadrant II."
      },
      {
        id: "L9-PHY-005",
        subject: "Physics",
        topic: "Gravitation",
        difficulty: "medium",
        questionText: "What is the approximate standard acceleration due to Earth's gravity (g) near the surface?",
        type: "mcq",
        options: ["9.8 m/s²", "98 m/s²", "0.98 m/s²", "6.67 m/s²"],
        correctIndex: 0,
        solutionSteps: [
          "Universal formula: g = (G × M) ÷ R².",
          "Substituting Earth's mass (5.97 × 10²⁴ kg) and radius (6.37 × 10⁶ m):",
          "g ≈ 9.8 m/s² (directed downwards toward Earth's center)."
        ],
        hint: "Around 9.8 meters per second squared."
      },
      {
        id: "L9-CHEM-006",
        subject: "Chemistry",
        topic: "Matter in Our Surroundings",
        difficulty: "medium",
        questionText: "The direct transition of a substance from solid phase directly into gas phase without passing through liquid phase is called:",
        type: "mcq",
        options: ["Evaporation", "Sublimation", "Condensation", "Deposition"],
        correctIndex: 1,
        solutionSteps: [
          "Normally, solids melt to liquid then vaporize to gas.",
          "Substances like camphor, naphthalene, and dry ice (solid CO2) bypass liquid state completely.",
          "This phase transition is called Sublimation."
        ],
        hint: "Solid directly to vapor is sublimation (e.g. camphor)."
      },
      {
        id: "L9-BIO-007",
        subject: "Biology",
        topic: "Cell Biology",
        difficulty: "medium",
        questionText: "Which organelle contains digestive hydrolytic enzymes capable of digesting worn-out organelles, earning it the title 'Suicide Bag of the Cell'?",
        type: "mcq",
        options: ["Vacuole", "Centrosome", "Lysosome", "Ribosome"],
        correctIndex: 2,
        solutionSteps: [
          "Lysosomes are membrane-bound vesicles filled with powerful hydrolytic digestive enzymes.",
          "When a cell is damaged or dies, lysosomes rupture and digest their own cellular components (autolysis).",
          "Hence, they are termed 'Suicide Bags'."
        ],
        hint: "Lysosome causes lysis (breakdown)."
      },
      {
        id: "L9-MATH-008",
        subject: "Math",
        topic: "Polynomials",
        difficulty: "medium",
        questionText: "What is the degree of the polynomial: P(x) = 5x⁴ - 3x² + 7x - 9?",
        type: "mcq",
        options: ["1", "2", "4", "5"],
        correctIndex: 2,
        solutionSteps: [
          "The degree of a polynomial in a single variable is the highest exponent of the variable with a non-zero coefficient.",
          "In 5x⁴ - 3x² + 7x - 9, the highest power of x is 4.",
          "Therefore, the degree is 4."
        ],
        hint: "Find the highest power of x."
      },
      {
        id: "L9-PHY-009",
        subject: "Physics",
        topic: "Work and Energy",
        difficulty: "medium",
        questionText: "What is the Kinetic Energy (KE) of an object with mass 4 kg moving at a velocity of 3 m/s?",
        type: "mcq",
        options: ["12 J", "18 J", "24 J", "36 J"],
        correctIndex: 1,
        solutionSteps: [
          "Kinetic Energy formula: KE = 1/2 × m × v².",
          "v² = 3² = 9.",
          "KE = 1/2 × 4 kg × 9 m²/s² = 2 × 9 = 18 Joules (J)."
        ],
        hint: "1/2 × mass × velocity²: 0.5 × 4 × 9."
      },
      {
        id: "L9-CHEM-010",
        subject: "Chemistry",
        topic: "Structure of the Atom",
        difficulty: "medium",
        questionText: "Rutherford's gold-foil alpha-particle scattering experiment led to the discovery of which atomic component?",
        type: "mcq",
        options: ["Electron", "Neutron", "Atomic Nucleus", "Quark"],
        correctIndex: 2,
        solutionSteps: [
          "Most alpha particles passed straight through the foil, but a small fraction deflected at large angles or bounced straight back.",
          "This proved that mass and positive charge are concentrated in a tiny dense core.",
          "Rutherford thereby discovered the Atomic Nucleus."
        ],
        hint: "The dense central core of the atom."
      },
      {
        id: "L9-BIO-011",
        subject: "Biology",
        topic: "Diversity in Living Organisms",
        difficulty: "medium",
        questionText: "Which kingdom in Whittaker's Five Kingdom Classification comprises prokaryotic, unicellular organisms like bacteria?",
        type: "mcq",
        options: ["Protista", "Monera", "Fungi", "Plantae"],
        correctIndex: 1,
        solutionSteps: [
          "Organisms lacking a defined nuclear membrane and membrane-bound organelles are prokaryotes.",
          "In Whittaker's system, all prokaryotic bacteria belong exclusively to Kingdom Monera.",
          "Correct kingdom: Monera."
        ],
        hint: "Kingdom Monera contains all true bacteria."
      },
      {
        id: "L9-MATH-012",
        subject: "Math",
        topic: "Heron's Formula",
        difficulty: "medium",
        questionText: "If the semi-perimeter of a triangle with side lengths a, b, and c is s, what is the formula for s?",
        type: "mcq",
        options: ["s = (a + b + c) / 3", "s = (a + b + c) / 2", "s = a × b × c", "s = a² + b² + c²"],
        correctIndex: 1,
        solutionSteps: [
          "Perimeter is the sum of all sides: P = a + b + c.",
          "'Semi' means half of the perimeter.",
          "So semi-perimeter s = (a + b + c) ÷ 2."
        ],
        hint: "Half of the perimeter."
      },
      {
        id: "L9-PHY-013",
        subject: "Physics",
        topic: "Sound",
        difficulty: "medium",
        questionText: "What is the audible frequency range of hearing for an average healthy human ear?",
        type: "mcq",
        options: ["2 Hz to 2,000 Hz", "20 Hz to 20,000 Hz", "200 Hz to 200,000 Hz", "0 Hz to 100 Hz"],
        correctIndex: 1,
        solutionSteps: [
          "Frequencies below 20 Hz are infrasonic (felt rather than heard).",
          "Frequencies above 20,000 Hz (20 kHz) are ultrasonic (detectable by bats/dogs).",
          "Human audible hearing range spans 20 Hz to 20,000 Hz."
        ],
        hint: "20 Hertz to 20 kilohertz."
      },
      {
        id: "L9-CHEM-014",
        subject: "Chemistry",
        topic: "Isotopes",
        difficulty: "medium",
        questionText: "Isotopes of a chemical element possess the SAME number of ________ but a DIFFERENT number of ________.",
        type: "mcq",
        options: [
          "Neutrons; Protons",
          "Protons; Neutrons",
          "Electrons; Protons",
          "Neutrons; Electrons"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Isotopes belong to the same element, so they have the identical atomic number (Z = number of protons).",
          "Their mass numbers (A) differ because their nuclei contain differing quantities of neutral neutrons.",
          "Same protons; different neutrons."
        ],
        hint: "Same atomic number (protons), different mass number (neutrons)."
      },
      {
        id: "L9-BIO-015",
        subject: "Biology",
        topic: "Epithelial Tissue",
        difficulty: "medium",
        questionText: "Which type of animal epithelial tissue forms a flat, mosaic tile-like protective lining in blood vessels and lung alveoli?",
        type: "mcq",
        options: ["Squamous epithelium", "Cuboidal epithelium", "Columnar epithelium", "Ciliated epithelium"],
        correctIndex: 0,
        solutionSteps: [
          "Squamous cells are extremely thin and flat with irregular boundaries.",
          "Their thin profile facilitates rapid passive gas and nutrient diffusion across capillary walls and alveoli.",
          "Tissue = Squamous epithelium."
        ],
        hint: "'Squama' means scale or flat tile."
      },
      {
        id: "L9-MATH-016",
        subject: "Math",
        topic: "Linear Equations in Two Variables",
        difficulty: "medium",
        questionText: "Which of the following points satisfies the equation 2x + 3y = 12?",
        type: "mcq",
        options: ["(3, 2)", "(2, 3)", "(0, 6)", "(6, 2)"],
        correctIndex: 0,
        solutionSteps: [
          "Substitute (3, 2): x = 3, y = 2.",
          "Left-hand side = 2(3) + 3(2) = 6 + 6 = 12.",
          "Right-hand side = 12.",
          "Point (3, 2) satisfies the equation."
        ],
        hint: "Plug in x = 3 and y = 2: 2(3) + 3(2) = 12."
      },
      {
        id: "L9-PHY-017",
        subject: "Physics",
        topic: "Newton's Third Law",
        difficulty: "easy",
        questionText: "When a space rocket launches, hot exhaust gases are expelled downward at high velocity, propelling the rocket upward. This demonstrates:",
        type: "mcq",
        options: [
          "Newton's First Law of Motion",
          "Newton's Second Law of Motion",
          "Newton's Third Law of Motion (Action and Reaction)",
          "Ohm's Law"
        ],
        correctIndex: 2,
        solutionSteps: [
          "Newton's Third Law states: To every action there is an equal and opposite reaction.",
          "Action: Rocket engines forcefully expel gases downward.",
          "Reaction: The escaping gases exert an equal upward thrust force on the rocket.",
          "Newton's Third Law of Motion."
        ],
        hint: "Action and reaction are equal and opposite."
      },
      {
        id: "L9-CHEM-018",
        subject: "Chemistry",
        topic: "Solutions and Mixtures",
        difficulty: "medium",
        questionText: "The scattering of a visible beam of light by colloidal particles is known as the:",
        type: "mcq",
        options: ["Doppler effect", "Tyndall effect", "Photoelectric effect", "Greenhouse effect"],
        correctIndex: 1,
        solutionSteps: [
          "Colloidal particles have diameters between 1 nm and 1000 nm, large enough to scatter light rays.",
          "When a beam of light passes through a colloid (or smoke/fog), its path becomes luminous and visible.",
          "This phenomenon is the Tyndall Effect."
        ],
        hint: "John Tyndall discovered this scattering in colloids."
      },
      {
        id: "L9-BIO-019",
        subject: "Biology",
        topic: "Natural Resources",
        difficulty: "medium",
        questionText: "Which atmospheric layer contains the vital Ozone (O₃) shield that absorbs harmful ultraviolet (UV) radiation from the Sun?",
        type: "mcq",
        options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
        correctIndex: 1,
        solutionSteps: [
          "The troposphere is the lowest weather layer (0 to ~12 km).",
          "Above it lies the Stratosphere (12 to 50 km).",
          "The ozone layer resides in the lower stratosphere, filtering out solar UV-B and UV-C rays.",
          "Atmospheric layer: Stratosphere."
        ],
        hint: "The second layer of Earth's atmosphere, above troposphere."
      },
      {
        id: "L9-MATH-020",
        subject: "Math",
        topic: "Surface Area and Volume",
        difficulty: "medium",
        questionText: "What is the volume of a sphere of radius r?",
        type: "mcq",
        options: ["4 π r²", "(4/3) π r³", "(2/3) π r³", "2 π r h"],
        correctIndex: 1,
        solutionSteps: [
          "Surface area of a sphere is 4πr².",
          "Integrating spherical shells yields volume = (4/3)πr³.",
          "Volume = (4/3) π r³."
        ],
        hint: "Four-thirds pi r cubed."
      }
    ]
  },

  // LEVEL 10: CLASS 10 (Full Board-Level Syllabus: Math, Physics, Chemistry, Biology)
  {
    level: 10,
    class: "10",
    subject: "Full Science & Math (Board Level)",
    description: "Class 10: Quadratic equations, trigonometry, light & optics, electricity, chemical reactions, acids & bases, and genetics.",
    questions: [
      {
        id: "L10-MATH-001",
        subject: "Math",
        topic: "Quadratic Equations",
        difficulty: "hard",
        questionText: "For the quadratic equation ax² + bx + c = 0, what is the discriminant (D) and its condition for having TWO DISTINCT REAL ROOTS?",
        type: "mcq",
        options: [
          "D = b² - 4ac > 0",
          "D = b² - 4ac = 0",
          "D = b² - 4ac < 0",
          "D = 2a / b > 0"
        ],
        correctIndex: 0,
        solutionSteps: [
          "The roots of ax² + bx + c = 0 are given by x = (-b ± √D) / (2a).",
          "The discriminant is D = b² - 4ac.",
          "If D > 0, the square root is real and non-zero, producing two distinct real roots.",
          "(If D = 0 roots are equal; if D < 0 roots are imaginary)."
        ],
        hint: "D must be strictly positive (b² - 4ac > 0)."
      },
      {
        id: "L10-PHY-002",
        subject: "Physics",
        topic: "Electricity",
        difficulty: "medium",
        questionText: "According to Ohm's Law, at constant temperature, the current (I) flowing through a conductor is directly proportional to potential difference (V). What is the formula?",
        type: "mcq",
        options: ["V = I × R", "V = I / R", "I = V × R", "P = V × I"],
        correctIndex: 0,
        solutionSteps: [
          "Ohm's Law states: V ∝ I.",
          "Introducing the constant of proportionality R (Resistance):",
          "V = I × R (Voltage = Current × Resistance).",
          "Standard formula: V = IR."
        ],
        hint: "V = IR."
      },
      {
        id: "L10-CHEM-003",
        subject: "Chemistry",
        topic: "Chemical Reactions",
        difficulty: "medium",
        questionText: "What type of chemical reaction is represented by: 2Mg + O₂ → 2MgO?",
        type: "mcq",
        options: ["Decomposition reaction", "Combination reaction", "Displacement reaction", "Double displacement reaction"],
        correctIndex: 1,
        solutionSteps: [
          "Two separate reactants (Magnesium metal and Oxygen gas) react together.",
          "They combine into a single chemical product (Magnesium oxide, MgO).",
          "Reactions where two or more reactants combine into one single product are Combination Reactions."
        ],
        hint: "Two elements combine to form a single compound."
      },
      {
        id: "L10-BIO-004",
        subject: "Biology",
        topic: "Life Processes",
        difficulty: "medium",
        questionText: "What is the structural and functional microscopic filtration unit of the human kidney?",
        type: "mcq",
        options: ["Neuron", "Nephron", "Alveolus", "Villus"],
        correctIndex: 1,
        solutionSteps: [
          "Neurons are the structural units of the nervous system.",
          "Alveoli are units of respiratory gas exchange in the lungs.",
          "Each kidney contains approximately 1 million Nephrons, which filter blood through Bowman's capsules and tubules to form urine."
        ],
        hint: "Starts with Neph- (Nephron)."
      },
      {
        id: "L10-MATH-005",
        subject: "Math",
        topic: "Trigonometry",
        difficulty: "medium",
        questionText: "Which of the following is a fundamental Pythagorean trigonometric identity for any acute angle θ?",
        type: "mcq",
        options: [
          "sin²θ + cos²θ = 1",
          "sin²θ - cos²θ = 1",
          "tan²θ + 1 = cos²θ",
          "sinθ × cosθ = 1"
        ],
        correctIndex: 0,
        solutionSteps: [
          "From a right triangle with sides a (opposite), b (adjacent), and c (hypotenuse): a² + b² = c².",
          "Divide by c²: (a/c)² + (b/c)² = 1.",
          "Since sinθ = a/c and cosθ = b/c:",
          "sin²θ + cos²θ = 1."
        ],
        hint: "Sine squared plus cosine squared equals one."
      },
      {
        id: "L10-PHY-006",
        subject: "Physics",
        topic: "Light and Optics",
        difficulty: "medium",
        questionText: "What is the Lens Formula relating focal length (f), image distance (v), and object distance (u)?",
        type: "mcq",
        options: [
          "1/f = 1/v - 1/u",
          "1/f = 1/v + 1/u",
          "f = v × u",
          "1/f = u - v"
        ],
        correctIndex: 0,
        solutionSteps: [
          "For spherical mirrors, the mirror formula is 1/f = 1/v + 1/u.",
          "For thin optical lenses, refraction reverses the sign:",
          "1/f = 1/v - 1/u.",
          "Correct lens formula: 1/f = 1/v - 1/u."
        ],
        hint: "Minus sign between 1/v and 1/u for lenses."
      },
      {
        id: "L10-CHEM-007",
        subject: "Chemistry",
        topic: "Carbon and Its Compounds",
        difficulty: "medium",
        questionText: "Carbon forms millions of organic compounds due to its unique ability to form strong covalent bonds with other carbon atoms. This property is called:",
        type: "mcq",
        options: ["Allotropy", "Catenation", "Electronegativity", "Isomerism"],
        correctIndex: 1,
        solutionSteps: [
          "Carbon has a valency of 4 (tetravalency) and a very small atomic size, creating exceptionally strong C-C covalent bonds.",
          "The self-linking capability of carbon atoms into long chains, branched networks, and rings is called Catenation."
        ],
        hint: "Self-linking of atoms into long chains = Catenation."
      },
      {
        id: "L10-BIO-008",
        subject: "Biology",
        topic: "Heredity and Evolution",
        difficulty: "medium",
        questionText: "In Gregor Mendel's monohybrid cross of pure tall (TT) and pure dwarf (tt) pea plants, what is the PHENOTYPIC ratio in the F2 generation?",
        type: "mcq",
        options: ["1 : 1", "3 : 1 (Tall : Dwarf)", "1 : 2 : 1", "9 : 3 : 3 : 1"],
        correctIndex: 1,
        solutionSteps: [
          "F1 generation offspring are all heterozygous tall (Tt).",
          "Self-crossing F1 (Tt × Tt) gives genotypes: 1 TT : 2 Tt : 1 tt.",
          "Phenotypically, TT and Tt are tall (3 parts), while tt is dwarf (1 part).",
          "Phenotypic ratio = 3 : 1."
        ],
        hint: "3 Tall to 1 Dwarf."
      },
      {
        id: "L10-MATH-009",
        subject: "Math",
        topic: "Trigonometry",
        difficulty: "easy",
        questionText: "What is the exact value of tan 45°?",
        type: "mcq",
        options: ["0", "1/2", "1", "√3"],
        correctIndex: 2,
        solutionSteps: [
          "In a 45°-45°-90° right isosceles triangle, both legs are equal in length (opposite = adjacent).",
          "tan 45° = opposite / adjacent = x / x = 1.",
          "Therefore, tan 45° = 1."
        ],
        hint: "Opposite and adjacent sides are equal at 45 degrees."
      },
      {
        id: "L10-PHY-010",
        subject: "Physics",
        topic: "Electricity",
        difficulty: "medium",
        questionText: "Two resistors of 6 Ω and 3 Ω are connected in PARALLEL. What is their equivalent resistance (R_eq)?",
        type: "mcq",
        options: ["9 Ω", "2 Ω", "4.5 Ω", "18 Ω"],
        correctIndex: 1,
        solutionSteps: [
          "Parallel resistance formula: 1/R_eq = 1/R1 + 1/R2.",
          "1/R_eq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2.",
          "Taking the reciprocal: R_eq = 2 Ω.",
          "Equivalent parallel resistance = 2 Ω."
        ],
        hint: "Product over sum: (6 × 3) / (6 + 3) = 18 / 9 = 2."
      },
      {
        id: "L10-CHEM-011",
        subject: "Chemistry",
        topic: "Acids, Bases and Salts",
        difficulty: "medium",
        questionText: "What is the chemical formula of Plaster of Paris (POP)?",
        type: "mcq",
        options: [
          "CaSO₄ · 2H₂O",
          "CaSO₄ · ½H₂O",
          "Na₂CO₃ · 10H₂O",
          "CaOCl₂"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Gypsum is Calcium sulphate dihydrate: CaSO₄ · 2H₂O.",
          "When gypsum is carefully heated to 373 K (100°C), it loses three-fourths of its crystallization water.",
          "It forms Calcium sulphate hemihydrate: CaSO₄ · ½H₂O (Plaster of Paris)."
        ],
        hint: "Calcium sulphate hemihydrate (half water molecule per CaSO4)."
      },
      {
        id: "L10-BIO-012",
        subject: "Biology",
        topic: "Control and Coordination",
        difficulty: "medium",
        questionText: "Which plant hormone promotes cell elongation, apical dominance, and causes phototropic bending towards sunlight?",
        type: "mcq",
        options: ["Auxin", "Gibberellin", "Abscisic acid", "Cytokinin"],
        correctIndex: 0,
        solutionSteps: [
          "Auxin is synthesized at shoot tips.",
          "When light comes from one direction, auxin diffuses to the shaded side of the shoot.",
          "Higher auxin concentration stimulates cells on the shaded side to grow longer, bending the shoot toward light.",
          "Hormone = Auxin."
        ],
        hint: "Synthesized at shoot tips for elongation."
      },
      {
        id: "L10-MATH-013",
        subject: "Math",
        topic: "Arithmetic Progressions",
        difficulty: "medium",
        questionText: "In an Arithmetic Progression (AP) with first term a = 3 and common difference d = 4, what is the 10th term (a₁₀)?",
        type: "mcq",
        options: ["36", "39", "40", "43"],
        correctIndex: 1,
        solutionSteps: [
          "General formula for the nth term of an AP: aₙ = a + (n - 1)d.",
          "a₁₀ = 3 + (10 - 1) × 4.",
          "a₁₀ = 3 + (9 × 4) = 3 + 36 = 39."
        ],
        hint: "3 + 9(4) = 39."
      },
      {
        id: "L10-PHY-014",
        subject: "Physics",
        topic: "Magnetic Effects of Current",
        difficulty: "medium",
        questionText: "Which rule predicts the direction of force experienced by a current-carrying conductor placed inside a magnetic field?",
        type: "mcq",
        options: [
          "Fleming's Left-Hand Rule",
          "Fleming's Right-Hand Rule",
          "Maxwell's Right-Hand Corkscrew Rule",
          "Ampere's Circuital Law"
        ],
        correctIndex: 0,
        solutionSteps: [
          "Fleming's Left-Hand Rule is used for electric motors:",
          "Thumb points to Force (Motion), Forefinger points to Magnetic Field, and Middle finger points to Current.",
          "(Right-Hand rule is for induced current in generators).",
          "Correct rule: Fleming's Left-Hand Rule."
        ],
        hint: "Left hand for motors/force, right hand for generators/induced current."
      },
      {
        id: "L10-CHEM-015",
        subject: "Chemistry",
        topic: "Metals and Reactivity",
        difficulty: "medium",
        questionText: "What happens when an iron nail is dipped into a blue copper sulphate (CuSO₄) solution?",
        type: "mcq",
        options: [
          "No reaction takes place",
          "Iron displaces copper, turning solution green and depositing reddish-brown copper on the nail",
          "The solution turns deep purple with gas bubbling",
          "The nail completely dissolves in seconds"
        ],
        correctIndex: 1,
        solutionSteps: [
          "Iron is more reactive than Copper in the metal reactivity series.",
          "Fe + CuSO₄ → FeSO₄ + Cu.",
          "Blue copper sulphate transforms into pale green ferrous sulphate (FeSO₄).",
          "Reddish-brown copper metal plates out onto the iron nail."
        ],
        hint: "Single displacement reaction: Iron kicks out copper."
      },
      {
        id: "L10-BIO-016",
        subject: "Biology",
        topic: "Life Processes",
        difficulty: "medium",
        questionText: "During intense strenuous exercise, muscle cells experience oxygen deficiency and break down pyruvate anaerobically into:",
        type: "mcq",
        options: ["Ethanol + CO₂", "Lactic acid + Energy", "Water + CO₂", "Urea"],
        correctIndex: 1,
        solutionSteps: [
          "In high-intensity sprinting, oxygen delivery to muscles cannot meet cellular energy demands.",
          "Pyruvate is converted via anaerobic glycolysis into 3-carbon Lactic Acid.",
          "Accumulation of lactic acid in muscle fibers causes fatigue and muscle cramps."
        ],
        hint: "Lactic acid accumulation causes muscle cramps."
      },
      {
        id: "L10-MATH-017",
        subject: "Math",
        topic: "Circles",
        difficulty: "medium",
        questionText: "How many tangents can be drawn to a circle from a single point lying OUTSIDE the circle?",
        type: "mcq",
        options: ["Exactly 1", "Exactly 2", "Infinitely many", "Zero"],
        correctIndex: 1,
        solutionSteps: [
          "From an external point P outside a circle with center O,",
          "Two straight lines can be drawn that touch the circle at exactly one point each (tangency points A and B).",
          "Moreover, both tangent segments PA and PB are equal in length.",
          "Exactly 2 tangents."
        ],
        hint: "From an external point, exactly two tangents touch the circle."
      },
      {
        id: "L10-PHY-018",
        subject: "Physics",
        topic: "Optics and Human Eye",
        difficulty: "medium",
        questionText: "Myopia (near-sightedness), where distant objects appear blurry, is corrected using which optical lens?",
        type: "mcq",
        options: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
        correctIndex: 1,
        solutionSteps: [
          "In a myopic eye, rays from distant objects converge in front of the retina.",
          "A diverging Concave Lens spreads the incoming parallel rays slightly outward.",
          "This pushes the focal convergence point backward directly onto the retinal screen.",
          "Corrective lens = Concave lens."
        ],
        hint: "A diverging (concave) lens corrects myopia."
      },
      {
        id: "L10-CHEM-019",
        subject: "Chemistry",
        topic: "pH Scale",
        difficulty: "easy",
        questionText: "A solution turns universal indicator purple and has a pH of 13. This solution is:",
        type: "mcq",
        options: ["Strongly acidic", "Weakly acidic", "Neutral", "Strongly alkaline (basic)"],
        correctIndex: 3,
        solutionSteps: [
          "The pH scale ranges from 0 to 14.",
          "pH 7 is neutral (pure water).",
          "pH 0 to 6 is acidic (lower is stronger).",
          "pH 8 to 14 is basic/alkaline. pH 13 has very high OH- concentration, so it is Strongly Basic."
        ],
        hint: "pH > 7 is basic; pH 13 is near maximum alkalinity (14)."
      },
      {
        id: "L10-BIO-020",
        subject: "Biology",
        topic: "Genetics",
        difficulty: "medium",
        questionText: "In humans, which combination of sex chromosomes determines a biological MALE offspring?",
        type: "mcq",
        options: ["XX", "XY", "YY", "XO"],
        correctIndex: 1,
        solutionSteps: [
          "Human somatic cells carry 22 pairs of autosomes and 1 pair of sex chromosomes (total 46).",
          "Females have two homologous X chromosomes: XX.",
          "Males have one X chromosome and one Y chromosome: XY.",
          "Offspring inheriting a Y chromosome from the father develops as male (XY)."
        ],
        hint: "XX is female, XY is male."
      }
    ]
  }
];

// Write question files
questionBanks.forEach(qb => {
  const filename = `level_${qb.level}.json`;
  const jsonContent = JSON.stringify(qb, null, 2);
  
  fs.writeFileSync(path.join(targetDir, filename), jsonContent, 'utf-8');
  fs.writeFileSync(path.join(previewDir, filename), jsonContent, 'utf-8');
  console.log(`Saved ${filename} with ${qb.questions.length} curriculum-accurate questions.`);
});

console.log('All 10 Question Banks successfully generated!');
