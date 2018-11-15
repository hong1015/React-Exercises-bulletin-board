import React, {Component} from 'react'
import {FaPencilAlt, FaSave, FaTimes} from 'react-icons/fa';

import Draggable from 'react-draggable';


class Note extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            isHovered: false,
            saved: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.save = this.save.bind(this)
        this.randomBetween = this.randomBetween.bind(this)
        this.hoverShow = this.hoverShow.bind(this)
        this.pinToFront = this.pinToFront.bind(this)

    }

    componentWillMount(){
        if(!this.state.editing && !this.state.saved){
                this.style = {
                    right: this.randomBetween(0, window.innerWidth - 150, 'px'),
                    top: this.randomBetween(0, window.innerHeight - 150, 'px'),
                    //transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
            }
        }

        //if(this.state.editing){
        //    this.style = {
        //        right: this.randomBetween(0, window.innerWidth - 150, 'px'),
        //        top: this.randomBetween(0, window.innerHeight - 150, 'px'),
        //        transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        //    }
        //}
    }

    randomBetween(x,y,s){
        return x + Math.ceil(Math.random() *(y-x)) +s 
    }

    componentDidUpdate(){
        var textArea
        if(this.state.editing){
            textArea = this._newText
            textArea.focus()
            textArea.select()
        }
       
       



    }

    shouldComponentUpdate(nextProps, nextState){
        return(
            this.props.children !== nextProps.children || this.state !== nextState)
    }
    
    edit() {
        console.log(this.containerLine.offsetTop)
        this.setState ({
            editing: true,
            saved: false
        })
        this.styleUpdate={
            left: this.containerLine.offsetLeft,  
            top: this.containerLine.offsetTop,
            transform: this.containerLine.style.transform
        }
     
    }
    remove(){
        this.props.onRemove(this.props.index)
    }
    save(e){
        console.log("this " + this.containerLineSaved.style.transform)
        e.preventDefault()
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false,
            saved: true

        })
        

        this.style = {
            left: 10,  
            top: 10,
                //left: this.containerLineSaved.offsetLeft,  
                //top: this.containerLineSaved.offsetTop,
                transform: this.containerLineSaved.style.transform
            }

    }
    renderForm (){
        return(
            <div className="note" style={ this.styleUpdate} ref={el => this.containerLineSaved = el}>
                <form onSubmit={this.save} >
                    <textarea ref={input => this._newText = input}
                    defaultValue={this.props.children}/>
                    <button><FaSave /></button>
                </form>
            </div>
                    

            )
}


    hoverShow(){
        
        this.setState({
            isHovered: !this.state.isHovered
        });
    }
    pinToFront(){
        this.setState({frontNote: !this.state.frontNote})
    }

    renderDisplay() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        //const {deltaPosition, controlledPosition} = this.state;
        let noteClass = this.state.frontNote ? " pinfronts" : "" ; // toogle class
        const btn_class = this.state.isHovered ? " infront" : "";
    
        return(
          
           
                 //<Draggable {...dragHandlers} >
                <Draggable handle="strong" {...dragHandlers}>
                    <div style={this.style} className={"note" + btn_class + noteClass}   onMouseEnter={this.hoverShow} onMouseLeave={this.hoverShow} onClick={this.pinToFront}  onDoubleClick={this.edit} ref={el => this.containerLine = el}>      
                    <strong className="cursor"></strong>
                        <span>
                            <button onClick={this.edit} id='edit'><FaPencilAlt /></button>
                            <button onClick={this.remove}  id='remove'><FaTimes /></button>
                        </span>
                        <p>{this.props.children}</p>
                    </div>
                </Draggable>
            )
                        }
    render() {
       
        if(this.state.editing){
            return this.renderForm()
        } else {
            return this.renderDisplay();
        }


        //return this.state.editing ? this.renderForm() : this.renderDisplay()

    }

}

export default Note


