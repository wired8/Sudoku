[Sudoku](https://sudoku.wired8.com/)
==================================================

[![Build Status](https://travis-ci.org/wired8/Sudoku.svg?branch=master)](https://travis-ci.org/wired8/Sudoku)
[![Coverage Status](https://coveralls.io/repos/github/wired8/Sudoku/badge.svg?branch=master)](https://coveralls.io/github/wired8/Sudoku?branch=master)

## Introduction

This project is a React web-app for solving Sudoku Puzzles backed by a NodeJS REST API. 
The Sudoku puzzles can be generated or manually entered.  The Node API will attempt to solve the puzzles using a back-track algorithm provided a valid solution exists.


## Backtracking 

Backtracking is an algorithm for finding all (or some) of the solutions to a problem that incrementally builds candidates to the solution(s). As soon as it determines that a candidate cannot possibly lead to a valid solution, it abandons the candidate. Backtracking is all about choices and consequences.

```
Find row, col of an unassigned cell
  If there is none, return true
  For digits from 1 to 9
    a) If there is no conflict for digit at row, col
        assign digit to row, col and recursively try fill in rest of grid
    b) If recursion successful, return true
    c) Else, remove digit and try another
  If all digits have been tried and nothing worked, return false
```
## Links 

- The web-application can be visited [here](https://sudoku.wired8.com/)
- A guide on how to play Sudoku can be found [here](http://www.sudokuessentials.com/how_to_play_sudoku.html)
- An excellent article on Sudoku Backtracking [here](https://hackernoon.com/sudoku-and-backtracking-6613d33229af)

## Credit

This project is a combination of code snippets and ideas from many sources.  Thank you to the authors of these fine works for inspiration and code! 

- [Suduko AI](https://github.com/JPStrydom/Sudoku-AI)
- [Javascript Sudoku Puzzle Generator](https://codepen.io/pavlovsk/pen/XmjPOE) 


## Setup

If you'd like to run this project yourself, you can follow the following steps:

1) Clone the repository, or simply download the source code [here](https://github.com/wired8/Sudoku/archive/master.zip)
2) Download and install NodeJS [here](https://nodejs.org/en/download/)
3) Run the command `npm install` in the same directory as the source code to install all the required packages
4) Run the command `npm start` in the same directory as the source code to start both the API and Client

## Tests

Mocha API integration tests.

```
npm test
```