const win_conditions = 
new Vue({
    el: '#app',

    data: {
        history: [],
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        x_is_next: true,
        game_over: false,
        errormessage: ""
    },
    methods: {
        move: function (i, j) {
            const valid_move = this.checkValidMove(i, j)

            if (valid_move) {
                // Set new Board State
                const new_board = this.board.slice()
                new_board[i][j] = this.x_is_next ? 'X' : 'O'
                this.board = new_board

                // Toggle Player
                this.x_is_next = !this.x_is_next
            }
        },

        // position = { i: Number, j: Number }
        checkValidMove: function (x, y) {
            if (this.board[x][y]) {
                this.errormessage = "Cell is occupied."
                return false
            }

            this.errormessage = ""
            return true;
        },

        checkGameOver: () => {
            if ([...new Set(this.board[0]).length === 1].length === 1) {
                // won by row
            }
            // this.board.filter(arr => {
            //     arr.sort();
            //     arr[0] === arr
            // }
        }
    },
    watch: {
      board: new_board => {
        this.history = [...history.slice(), new_board]
        checkGameOver(new_board)
      }
    }
})


// win conditions
    // x val unchanged for 3 steps
    // y val unchanges for 3 steps
    // x and y delta is 1 for 3 steps