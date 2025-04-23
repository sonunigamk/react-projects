import React, { useContext } from 'react'
import "./mainSection.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function MainSection() {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)


    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user-icon" />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev</span></p>
                            <p>How can i help you today</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize thins concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {loading ? <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
                        </div>

                    </div>

                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input.trim()) {
                                    onSent();
                                }
                            }}
                        />

                        <div className='img-box'>
                            <img src={assets.gallery_icon} alt="Attach file" />
                            <img src={assets.mic_icon} alt="Voice input" />
                            {input && (
                                <img
                                    onClick={() => onSent()}
                                    src={assets.send_icon}
                                    alt="Send message"
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div >
                    <div className="bottom-info-box">
                    <p className='bottom-info'>Gemini's AI-generated responses may be inaccurate — please double-check important details. </p>
                    <span> AI responses may be inaccurate.</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainSection