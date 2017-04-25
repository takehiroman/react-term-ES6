import React from 'react';
import ReactDOM from 'react-dom';

class Terminal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            commands: {},
            history: [],
            prompt: '$ '
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.listFiles = this.listFiles.bind(this);
        this.showWelcomeMsg = this.showWelcomeMsg.bind(this);

    }

    registerCommands(){
        this.setState({
            commands:{
                'clear':this.clearHistory,
                'ls':this.listFiles,
                'intro':this,
                'help':this.showHelp,
                'cat':this.catFile.bind(this)
            }
        });
    }
    clearHistory(){
        this.setState({ history: [] });
    }

    listFiles(){
      this.addHistory("README.md");
    }

    showWelcomeMsg(){
      this.addHistory("Hello, I'm Prakhar Srivastav, a graduate student in the Computer Science department (Machine Learning track).");
      this.addHistory("Type `help` to see what all commands are available");
    }

    catFile(arg){
      if (arg === "README.md") {
          this.addHistory('### REACT TERM');
          this.addHistory("A couple of days back, I got an email from Columbia (the university that I'm stated to join) informing me that my new email ID and other student IT services were ready. Hosting my own webpage on a university's domain had long been a wish of mine, so as soon as I learnt about having some server space on the university's server I got excited wanted to put something interesting. Since I already have " +
                          "a boring about me page, I went " +
                          "with something different and built a simple terminal emulator in React!");
          this.addHistory("type `source` to view the source code");
      } else {
          this.addHistory("cat: " +  arg + ": No such file or directory");
      }
    }

    showHelp(){
      this.addHistory("help - this help text");
      this.addHistory("intro - print intro message");
      this.addHistory("clear - clear screen");
      this.addHistory("cat - print contents of a file");
      this.addHistory("ls - list files");
    }

    componentDidMount(){
        const term = ReactDOM.findDOMNode(this.refs.term);

        this.registerCommands();
        this.showWelcomeMsg();
        term.focus();
    }

    componentDidUpdate(){
        const el = ReactDOM.findDOMNode(this);

        const container = document.getElementById("main");
        container.scrollTop = el.scrollHeight;
    }

    handleInput(e){
      if (e.key === "Enter") {
          var input_text = ReactDOM.findDOMNode(this.refs.term).value;
          var input_array = input_text.split(' ');
          var input = input_array[0];
          var arg = input_array[1];
          var command = this.state.commands[input];
          this.addHistory(this.state.prompt + " " + input_text);
          console.log(input_text);
          if (command === undefined) {
              this.addHistory("sh: command not found: " + input);
          } else {
              command(arg);
          }
          this.clearInput();
      }

    }

    clearInput(){
        this.refs.term.value = "";
    }

    addHistory(output){
        var history = this.state.history;
        history.push(output)
        this.setState({
            'history': history
        });
    }

    handleClick(){
        var term = ReactDOM.findDOMNode(this.refs.term);
        term.focus();
    }

    render(){
        var output = this.state.history.map((op,i) => {
            return <p key={i}>{op}</p>
            
        });
        return(
            <div className="input-area" onClick={this.handleClick.bind(this)}>
               {output}
               <p>
                <span className="prompt">{this.state.prompt}</span>
                <input type="text" onKeyPress={this.handleInput.bind(this)} ref="term" />
                </p>
            </div>
        );
    }
}

export default Terminal;
