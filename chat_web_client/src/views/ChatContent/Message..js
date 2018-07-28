import React from "react";
import { chat, user } from "../../data";
import Avatar from "material-ui/Avatar";
import "./style.css";
import readText from "../../lib/readText";
import { removeIconTag, isImage, isVideo, isAudio } from "../../lib";
import Speak from "material-ui/svg-icons/av/volume-up";

const Message = ({ type = "text", text, m_user, path, name }) => (
  <div id="message">
    {(type === "text" || type === "file") && (
      <div
        className={`message-body ${
          m_user.id === user.info.id ? "my-message" : ""
        }`}
      >
        {m_user.id !== user.info.id && (
          <Avatar
            color={"#ffffff"}
            style={{ flexShrink: 0 }}
            backgroundColor={m_user.color}
            size={30}
          >
            {m_user.name[0].toUpperCase()}
          </Avatar>
        )}
        {type === "text" && (
          <div
            className="massage-content"
            style={
              m_user.id === user.info.id
                ? { background: chat.colorSelect, color: "#fff" }
                : {}
            }
          >
            <div dangerouslySetInnerHTML={{ __html: text }} />
            {removeIconTag(text).length != 0 && (
              <Speak
                color={m_user.id === user.info.id ? "#fff" : "#262626"}
                onClick={() => readText.speak(removeIconTag(text))}
                style={{ width: 18, float: "right", cursor: "pointer" }}
              />
            )}
          </div>
        )}
        {type === "file" && (
          <a
            href={`http://localhost:4000/public/${path}/${name.replace(
              / /g,
              "%20"
            )}`}
            target="blank"
          >
            {isImage(name) && (
              <div className="imag-massege file">
                <img src={`http://localhost:4000/static/${path}`} alt={name} />
              </div>
            )}
            {isVideo(name) && (
              <div className="video-maseeege file">
                <video
                  width="280"
                  height="240"
                  controls
                  style={
                    m_user.id == user.info.id
                      ? { transform: "translate(-100%,0)", margin: "0 100%" }
                      : {}
                  }
                >
                  <source src={`http://localhost:4000/static/${path}`} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {isAudio(name) && (
              <div>
                <audio
                  controls
                  style={
                    m_user.id == user.info.id
                      ? { transform: "translate(-100%,0)", margin: "0 100%" }
                      : {}
                  }
                >
                  <source src={`http://localhost:4000/static/${path}`} />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            )}
            {!isImage(name) && (
              <div
                className="massage-content file"
                style={
                  m_user.id === user.info.id
                    ? { background: chat.colorSelect, color: "#fff" }
                    : {}
                }
              >
                {name}
              </div>
            )}
          </a>
        )}
      </div>
    )}
    {type === "settings" && <div className="settings"> {text}</div>}
  </div>
);

export default Message;
