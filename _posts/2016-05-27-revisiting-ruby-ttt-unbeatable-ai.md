---
layout: post
Title: Bonus: Revisiting Ruby Tic Tac Toe Unbeatable AI
date: 2016-05-27
---

I have been working for the past eight day on creating an unbeatable AI computer for my tic tac toe Python application. When I applied to 8th Light, given the opportunity to code for an unbeatable computer, my [ruby submission](https://github.com/NicoleCarpenter/tic-tac-toe-ruby) outlined a long chain of if/else statements that checked several conditions to decide where was the best position to place a computer marker to never lose. My May self is somewhat surprised that my December self wrote this, overall, pretty easy to follow method. 

```
def best_available(players, current_computer_player)
    opponent = players.find{|player| player != current_computer_player}
        player_win = next_move_win(current_computer_player)
        opponent_block = next_move_win(opponent)
        
if center_space_empty?
return find_center_space
elsif player_win
        return player_win
elsif opponent_block
        return opponent_block
elsif corner_space_empty?(@active_board)
    return corner_space_empty?(@active_board).sample
else
    random_move
end
end
```

As you can see from this method, after going through a setup that iterates through a player array to determine whether each player is human or computer, I checked in order if

the center space was empty 
the computer could win
the computer could block an opponent’s win, or
there was a corner move available

This, it seemed, manually passed the requirements tests. I played the game at least 100 times to see if I could beat the computer and I was not able to do so. 

But then, what would happen if I wanted to play this with a 4 x 4 board that does not have a center space? What then constitutes a best first move? Plus, if/else chaining like that is gross. How I am handling the players is a little weird because I am passing in a player array with both players and then passing in one of the players separately as it’s own entity. 

Take a look at my method rspec tests.

```
describe '#best_available' do
        players = [Player.new("Rick", "X"), Player.new("Computer", "O")]
        computer = players[1]
        context 'the computer can win' do
            it 'should return the winning place' do
                    board.active_board = ['O', 'O', ' ', ' ', 'O', ' ', ' ', ' ', ' ']
                    expect(board.best_available(players, computer)).to eq(3)
            end
        end

        context 'the opponent can win' do
            it 'should return the winning place' do
                    board.active_board = ['X', 'X', ' ', ' ', 'O', ' ', ' ', ' ', ' ']
                    expect(board.best_available(players, computer)).to eq(3)
        end
    end

    context 'the neither the opponent nor computer can win' do
        it 'should return the winning place' do
            board.active_board = ['O', 'O', 'X', ' ', ' ','O', ' ', ' ', ' ']
            expect(board.best_available(players, computer)).not_to eq(3)
        end
    end
end
```

These tests don’t really make sense. In the first test, I am checking against a board that would never be possible. Sure, the test would pass, but what does it matter if this specific scenario would never come up. The second test does make sense, because the computer with a marker of ‘O’ would be going for a win. We should probably also test if there is an opportunity to block. 

The last test goes way off the rails because the test does not communicate the logic of the method at all. Why wouldn’t the computer select the move at index 3? How would the ‘O’ player have three moves before the ‘X’ player has two? If the first option for best move was the center space, how, after 3 moves by the computer, has that not already been selected? Yeah, it is probably a good thing that I decided when I would design this using Python, that I was not going to reuse the logic from my Ruby version. 

The flaw in testing with mocked boards is that it is hard to say if the board is a logical board that would appear for a perfect AI player. If I am TDDing this, I would not have the game to play before to see where the AI would place its piece. This leaves me with testing the very smallest pieces of logic. Given only one remaining space on the board, is the computer completing the game by going for the tie? What would a win look like with a not-so-bright opponent? What would a block look like with an opponent going straight for a kill? 

In my python game, those tests look like this:

```
def test_select_space_tie(self): 
    self.board.active_board = ['X','O','O','X','X','O','O','X','  ']
    move = self.move_generator.select_space(self.board, 'X')
    self.assertEquals(move, 9)
  
def test_select_space_win(self):
    self.board.active_board = ['X','X','  ','  ','O','  ','  ','O','  ']
    move = self.move_generator.select_space(self.board, 'X')
    self.assertEquals(move, 3)

def test_select_space_block(self):
    self.board.active_board = ['O','O','  ','  ','X','  ','  ','  ','  ']
    move = self.move_generator.select_space(self.board, 'X')
    self.assertEquals(move, 3)
```

These tests are easy to simulate. The computer, in the tie situation, only has one place to go. In the win condition, the computer should always choose to end the game when it is able to do so. In the blocking condition, the computer must block the next player’s move, or risk losing.

This is easy to test through three or four moves but we are also making assumptions about our opponent. Sure, these are possible scenarios, but these three tests do not prove that the computer is unbeatable. 

My friend and colleague Tom McGee paired with me to create a test that would prove that the computer could not be beat. It essentially mocked the behavior that I would expect from my AI class using a helper method to simulate playing all possible games.

```
def test_select_space_unbeatable_first_move(self):
        self.play_all_games(self.board, 'O')

def test_select_space_unbeatable_second_move(self):
self.play_all_games(self.board, 'X')

def play_all_games(self, board, player_marker):
if board.is_winning_conditions_met():
self.assertNotEqual(board.find_winning_marker(), 'X')
if not board.is_winning_conditions_met() and not board.is_tie_condition_met():
if player_marker == 'X':
for space in board.find_open_spaces():
temp_board = copy.deepcopy(board)
temp_board.place_piece('X', space + 1)
self.play_all_games(temp_board, 'O')
elif player_marker == 'O':
temp_board = copy.deepcopy(board)
temp_board.place_piece('O', self.move_generator.select_space(temp_board, 'O'))
                self.play_all_games(temp_board, 'X')
```

Here I am making the assumption that the computer is always ‘O’ and the player is always ‘X’. I am running two scenarios, kicking off the first by starting the game with the computer placing a move, and evaluating all possible permutations of moves from the first move until the game ends. The second scenario sends in a player move and evaluates all possible games at all possible depths, alternating every other move with the computer piece. 

The way the test is set up, the computer is going to call the method that invokes the unbeatable computer selecting a move, therefore it should always choose the best move. If for some reason the game is finished during the recursion and the opponent player is determined to be the winner, than it would stand that our algorithm is not actually working. There should be no scenario in which the opposing player wins. 

This one test really eliminates the need for the other three tests as those scenarios would be tested in this one test

The downside to this test is that it chews up about 60 seconds between checking first and second move possibilities. Think about it, that is the AI checking each move and then for each move, checking each opponent’s move, and then for each there, checking its best move, and doing that for every single move at every single depth. And then we do it again with the player going first. In my opinion, a test that is that effective is worth the wait, but then again, we will see what my mentors have to say about that. 
