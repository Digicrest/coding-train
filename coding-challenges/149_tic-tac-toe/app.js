const cloneDeep = obj => JSON.parse(JSON.stringify(obj))

const initial_state = {
    history: [],
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    x_is_next: true,
    game_over: false,
    
    error_message: '',
    victory_message: ''
};

new Vue({
    el: '#app',
    data: cloneDeep(initial_state),
    methods: {
        move: function (i, j) {
            const valid_move = this.checkValidMove(i, j)

            if (valid_move) {
                // Set new Board State
                const new_board = this.board.slice()
                new_board[i][j] = this.x_is_next ? 'O' : 'X'
                this.board = new_board

                // Toggle Player
                this.x_is_next = !this.x_is_next
            } else {
                alert(this.error_message)
            }
        },

        // position = { i: Number, j: Number }
        checkValidMove: function (x, y) {
            this.error_message = ""

            if (this.board[x][y]) {
                this.error_message = "Cell is occupied."
                return false
            }

            if (this.game_over) {
                this.error_message = "Game has already ended."
                return false
            }

            return true;
        },

        checkGameOver: function () {
            // Horizontal Victory
            this.board.forEach((row, i) => {
                if (row[0] && row[0] === row[1] && row[1] === row[2]) {
                    this.victory_message = 'Horizontal'
                    this.game_over = true
                }
            });

            // Vertical Victory
            for (let i = 0; i < this.board.length; i++) {
                const top = this.board[0][i];
                const mid = this.board[1][i];
                const bot = this.board[2][i];

                if (top && top === mid && top === bot) {
                    this.victory_message = 'Vertical'
                    this.game_over = true
                }
            }

            // Diagonal Victory
            const top_right_to_bottom_left = this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]
            const top_left_to_bottom_right = this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]
            
            if (top_left_to_bottom_right || top_right_to_bottom_left) {
                this.victory_message = 'Diagonal'
                    ? [this.board[0][2], this.board[1][1], this.board[2][0]] 
                    : [this.board[0][0], this.board[1][1], this.board[2][2]]
                this.game_over = true
            }

            if (this.game_over) {
                this.victory_message += ` Victory for Player ${ this.x_is_next ? 'X' : 'O' }`
            }
        }
    },
    watch: {
      board: function () {
        this.history = [...this.history, cloneDeep(this.board)]
        this.checkGameOver()
      }
    }
})