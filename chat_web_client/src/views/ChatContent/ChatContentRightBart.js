import React from "react";
import { observer } from "mobx-react";
import Search from "material-ui/svg-icons/action/search";
import Color from "material-ui/svg-icons/image/color-lens";
import FileFolder from "material-ui/svg-icons/file/folder";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

import { chat, user } from "../../data";
import User from "../User";
import ModelChangeColor from "../ModelChangeColor";
import ModelChangeEmoji from "../ModelChangeEmoji";

import "./style.css";

const ChatContentRightBart = () => (
  <div id="chat-content-right-bart">
    <div className="header">
      {chat.user ? (
        <div>
          <User name={chat.user.name} color={chat.user.color} disabled={true} />
          {(chat.block == user.info.id || !chat.block) && (
            <button className="block-btn" onClick={() => chat.blockUser()}>
              {chat.blockText}
            </button>
          )}
        </div>
      ) : (
        <div style={{ lineHeight: "55px", marginLeft: "10px" }}>
          {chat.groupData.name}
        </div>
      )}
    </div>
    <div className="chat-content-right-bart-body">
      <Accordion accordion={false} className="accordion-options">
        <AccordionItem>
          <AccordionItemTitle>
            <h4 className="u-position-relative">
              Options
              <div className="accordion__arrow" role="presentation" />
            </h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div>
              <div
                className="accordion-options-content"
                onClick={() => chat.handleOpenModel("serach")}
              >
                <Search color={chat.colorSelect} style={{ marginTop: "4px" }} />
                <span>Search in Conversation</span>
              </div>
              {!chat.block && (
                <div>
                  <div
                    className="accordion-options-content"
                    onClick={() => chat.handleOpenModel("color")}
                  >
                    <Color
                      color={chat.colorSelect}
                      style={{ marginTop: "4px" }}
                    />
                    <span>Change Color</span>
                  </div>
                  <div
                    className="accordion-options-content"
                    onClick={() => chat.handleOpenModel("emoji")}
                  >
                    <i className={`twa twa-s twa-${chat.emojiSelect}`} />
                    <span>Change Emoji</span>
                  </div>
                </div>
              )}
            </div>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
      {chat.getImages.length !== 0 && (
        <Accordion accordion={false} className="accordion-photos">
          <AccordionItem>
            <AccordionItemTitle>
              <h4 className="u-position-relative">
                Shared Photos
                <div className="accordion__arrow" role="presentation" />
              </h4>
            </AccordionItemTitle>
            <AccordionItemBody>
              <div className="shared-photo-content">
                {chat.getImages.map(e => (
                  <a
                    key={e.id}
                    href={`http://localhost:4000/static/${e.path}`}
                    target="blank"
                  >
                    <img
                      src={`http://localhost:4000/static/${e.path}`}
                      alt={e.name}
                      stayle={{ width: "100%", height: "100%" }}
                    />
                  </a>
                ))}
              </div>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      )}
      {chat.groupData && (
        <Accordion accordion={false} className="accordion-pepole">
          <AccordionItem>
            <AccordionItemTitle>
              <h4 className="u-position-relative">
                People
                <div className="accordion__arrow" role="presentation" />
              </h4>
            </AccordionItemTitle>
            <AccordionItemBody className="accordion-pepole-body">
              <div>
                {chat.groupData.members.map(e => (
                  <User name={e.name} color={e.color} key={e.id} />
                ))}
              </div>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      )}

      {chat.getFiles.length !== 0 && (
        <Accordion accordion={false} className="accordion-files">
          <AccordionItem>
            <AccordionItemTitle>
              <h4 className="u-position-relative">
                Shared Files
                <div className="accordion__arrow" role="presentation" />
              </h4>
            </AccordionItemTitle>
            <AccordionItemBody className="accordion-file-body">
              <div>
                <ul>
                  {chat.getFiles.map(e => (
                    <li key={e.id}>
                      <a
                        href={`http://localhost:4000/public/${
                          e.path
                        }/${e.name.replace(/ /g, "")}`}
                        target="blank"
                      >
                        <FileFolder
                          color={"#ddd"}
                          style={{ position: "absolute", top: "3px" }}
                        />
                        <span>{e.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      )}
    </div>

    <ModelChangeColor />
    <ModelChangeEmoji />
  </div>
);

export default observer(ChatContentRightBart);
