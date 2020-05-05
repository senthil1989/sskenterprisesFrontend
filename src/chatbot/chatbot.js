import React, { useState, useEffect } from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import Message from './messages';
import sendImg from '../common/fonts/icons/send.svg';
import closeImg from '../common/fonts/icons/close.svg';
import chatImg from '../common/fonts/icons/chat-bubble-dots.svg';
import Card from './card';
// import QuickReplies from './quickReplies';

const ChatBot =()=>{
    const[message,setMessage]=useState([]);
    const[inputText,setinputText]=useState('');
    const[toogleBtn,settoogleBtn]=useState(false);
   let messagesEnd;
    const text_query =async(text)=>{
        let says={
            speaks:"me",
            msg:{
                text:{
                    text:text
                }
            }
        }
        setMessage(message => [...message, says])
        const res=await axios.post('http://localhost:8080/api/df_text_query',{text});
        for(let msg of res.data.fulfillmentMessages){
            says={
                speaks:"bot",
                msg:msg
            }
            setMessage(message => [...message, says])
        }
    }
    const event_query =async(event)=>{
        const res=await axios.post('http://localhost:8080/api/df_event_query',{event});
        for(let msg of res.data.fulfillmentMessages){
           let says={
                speaks:"bot",
                msg:msg
            }
            setMessage([...message,says])
        }
       
    }
   const renderCards=(cards)=> {
        return cards.map((card, i) => <Card key={i} payload={card}/>);
    }
   const renderOneMessage=(message, i)=> {
       console.log(message)
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;

        } else if (message.msg
            && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } 
        
    }
    const renderMessages=(stateMessage)=>{
        console.log(message ,"dkjkjsd kjkjsdkjak kjkdj ka",stateMessage)
        if(stateMessage){
             return  stateMessage.map((message,i)=>{
                return renderOneMessage(message, i); 
            })
        }
        else{
            return null
        }
    }
    const onChange=(e)=>{
        console.log(e.target.value,e)
        setinputText(e.target.value)
    }
    const _handleKeyUp =(e)=>{
        if (inputText.length !==0 && e.key === 'Enter') {
            text_query(e.target.value);
            setinputText('')
        }
    }
    const handleClick=(e)=>{
        if (inputText.length !== 0) {
            text_query(inputText);
            e.target.value = '';
            setinputText('');
        }
    }
 
    useEffect(()=>{
        console.log("Hi this is senthil")
        event_query('welcome')
    },[])
    useEffect(() => {
        if(toogleBtn){
            messagesEnd.scrollIntoView({ behavior: "smooth" })
        }
    });
    return(
        <>
         <div className="toggle-container" onClick ={()=>settoogleBtn(!toogleBtn)}>{toogleBtn ? <img className ="cancel-icon" name ="send" src={closeImg}  />:  <img className ="chat-icon"  name ="send" src={chatImg} />}</div>
        <div className="chat_container">
            <div  className="chat_box">
                { toogleBtn ? <><div className="messenger-header">Chat</div>
            <div className="messenger-container">
            {renderMessages(message)}
            <div ref={(el) => { messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div> 
            </div>
            
            <div className="text-container">
            <input type="text" placeholder="Enter your Message" autoFocus onChange={onChange} onKeyPress={_handleKeyUp}  value ={inputText}/>
            <div className="attach_btn"><button type="button" ><img name ="send" src={sendImg} onClick={handleClick}/></button></div>
            </div>
    </> :''

                }
            </div>
        </div>
        </>
    )
}
export default ChatBot;