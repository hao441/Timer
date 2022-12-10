const App = () => {
    
  let [session, setSession] = React.useState(25*60)
  let [breaker, setBreaker] = React.useState(25*60)
  let [turn, setTurn] = React.useState('start')
  let [sessionTimer, setSessionTimer] = React.useState(session)
  let [breakTimer, setBreakTimer] = React.useState(breaker)
  let [sb, setSb] = React.useState('session')
  let [inter, setInter] = React.useState(null)
  let [interBreak, setInterBreak] = React.useState(null)
  
    
   let breakIncrement = () => {
      if (breaker < 3600) {
        setBreaker(breaker+60)
      }
    }  
    
    let breakDecrement = () => {
      if (breaker > 60) {
        setBreaker(breaker-60)
      }
    }  
    
    let sessionIncrement = () => {
      if (session < 3600) {
        setSession(session+60)
      }
    }  
    
    let sessionDecrement = () => {
      if (session > 60) {
        setSession(session-60)
      }
    }  
  
    let startSession = () => {
      const countDown = Date.now()
      if (turn === 'start') {
      setInter(setInterval(() => {

        setSession(session--) 
      }, 10))
      } else if (turn === 'stop') {
        clearInterval(inter);
        setSession(session);
      }
    }
      
    let startBreak = () => {
      setBreaker(5*60)
      const countDown = Date.now()
      if (turn === 'stop') {
      setInter(setInterval(() => {

        setBreaker(breaker--) 
      }, 10))
      } else if (turn === 'start') {
        clearInterval(inter);
        setBreaker(breaker);
      }
    };
  
  
    
  turnHandler = () => {
    setTurn(turn === 'start' ? 'stop' : 'start')
    if (session >= 0) {
      startSession();
    }
  }
  
   
  let reseta = () => {
      clearInterval(inter);
      document.getElementById('beep').pause()
      document.getElementById('beep').currentTime = 0
      setSession(25*60);
      setBreaker(5*60);
      setTurn('start')
  }
  if (session === 0) {
    document.getElementById('beep').play()
  } else if (session < 0) {
    clearInterval(inter);
    setSession('');
    return startBreak();
  }
  if (breaker === 0) {
    document.getElementById('beep').play()
  } else if (breaker < 0) {
    
    setSession('');
    setBreaker('');
    return reseta();
  }
  
  
  formatTime = () => {
    const time = session < 0 || session === '' ? breaker : session
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds)
  }
  
  
  return (
    <div id="app-container">
      <h3>Timer App</h3>
      {/*timer container*/}
      <div className='row' id='timer-container'>
        <div className='col-sm' id='timer-column'>
          <audio id="beep" src="https://www.soundjay.com/buttons/sounds/beep-11.mp3"></audio>
          <div id="timer-label">{session < 0 || session === '' ? 'Break' : 'Session'}</div>
          <div id="time-left">{formatTime()}</div>
          <button id="start_stop" onClick={turnHandler}>{turn === 'start' ? 'start' : 'stop'}</button>
          <button id="reset" onClick={reseta}>Reset</button>
        </div>
      </div>
      {/*session/break container*/}
      <div className="row" id="sessionBreak-container">
        {/*break*/}
        <div className="col-sm" id='break-container'>
          <div id="break-label">Break Length</div>
            <div id="break-length">{Math.floor(breaker/60)}</div>
            <button id="break-increment" onClick={breakIncrement}>+</button>
            <button id="break-decrement" onClick={breakDecrement}>-</button>
        </div>
        {/*session*/}
        <div className="col-sm" id="session-container">
          <div id="session-label">Session Length</div>
            <div id="session-length">{Math.floor(session/60)}</div>
            <button id="session-increment" onClick={sessionIncrement}>+</button>
            <button id="session-decrement" onClick={sessionDecrement}>-</button>
        </div>
      </div>
   </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));