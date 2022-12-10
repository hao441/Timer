const App = () => {

  let [session, setSession] = React.useState(25 * 60);
  let [breaker, setBreaker] = React.useState(25 * 60);
  let [turn, setTurn] = React.useState('start');
  let [sessionTimer, setSessionTimer] = React.useState(session);
  let [breakTimer, setBreakTimer] = React.useState(breaker);
  let [sb, setSb] = React.useState('session');
  let [inter, setInter] = React.useState(null);
  let [interBreak, setInterBreak] = React.useState(null);


  let breakIncrement = () => {
    if (breaker < 3600) {
      setBreaker(breaker + 60);
    }
  };

  let breakDecrement = () => {
    if (breaker > 60) {
      setBreaker(breaker - 60);
    }
  };

  let sessionIncrement = () => {
    if (session < 3600) {
      setSession(session + 60);
    }
  };

  let sessionDecrement = () => {
    if (session > 60) {
      setSession(session - 60);
    }
  };

  let startSession = () => {
    const countDown = Date.now();
    if (turn === 'start') {
      setInter(setInterval(() => {

        setSession(session--);
      }, 10));
    } else if (turn === 'stop') {
      clearInterval(inter);
      setSession(session);
    }
  };

  let startBreak = () => {
    setBreaker(5 * 60);
    const countDown = Date.now();
    if (turn === 'stop') {
      setInter(setInterval(() => {

        setBreaker(breaker--);
      }, 10));
    } else if (turn === 'start') {
      clearInterval(inter);
      setBreaker(breaker);
    }
  };



  turnHandler = () => {
    setTurn(turn === 'start' ? 'stop' : 'start');
    if (session >= 0) {
      startSession();
    }
  };


  let reseta = () => {
    clearInterval(inter);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    setSession(25 * 60);
    setBreaker(5 * 60);
    setTurn('start');
  };
  if (session === 0) {
    document.getElementById('beep').play();
  } else if (session < 0) {
    clearInterval(inter);
    setSession('');
    return startBreak();
  }
  if (breaker === 0) {
    document.getElementById('beep').play();
  } else if (breaker < 0) {

    setSession('');
    setBreaker('');
    return reseta();
  }


  formatTime = () => {
    const time = session < 0 || session === '' ? breaker : session;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "app-container" }, /*#__PURE__*/
    React.createElement("h3", null, "Timer App"), /*#__PURE__*/

    React.createElement("div", { className: "row", id: "timer-container" }, /*#__PURE__*/
    React.createElement("div", { className: "col-sm", id: "timer-column" }, /*#__PURE__*/
    React.createElement("audio", { id: "beep", src: "https://www.soundjay.com/buttons/sounds/beep-11.mp3" }), /*#__PURE__*/
    React.createElement("div", { id: "timer-label" }, session < 0 || session === '' ? 'Break' : 'Session'), /*#__PURE__*/
    React.createElement("div", { id: "time-left" }, formatTime()), /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: turnHandler }, turn === 'start' ? 'start' : 'stop'), /*#__PURE__*/
    React.createElement("button", { id: "reset", onClick: reseta }, "Reset"))), /*#__PURE__*/



    React.createElement("div", { className: "row", id: "sessionBreak-container" }, /*#__PURE__*/

    React.createElement("div", { className: "col-sm", id: "break-container" }, /*#__PURE__*/
    React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", { id: "break-length" }, Math.floor(breaker / 60)), /*#__PURE__*/
    React.createElement("button", { id: "break-increment", onClick: breakIncrement }, "+"), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", onClick: breakDecrement }, "-")), /*#__PURE__*/


    React.createElement("div", { className: "col-sm", id: "session-container" }, /*#__PURE__*/
    React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", { id: "session-length" }, Math.floor(session / 60)), /*#__PURE__*/
    React.createElement("button", { id: "session-increment", onClick: sessionIncrement }, "+"), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", onClick: sessionDecrement }, "-")))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));