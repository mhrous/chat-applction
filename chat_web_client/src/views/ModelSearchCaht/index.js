import React from "react";

import { observer } from "mobx-react";

import { chat } from "../../data";

import "./style.css";

const ModelSearchCaht = () => (
  <div className="search">
    <div className="search-messenger">
      <label>
        <input
          type="text"
          className="search-for-in-caht"
          placeholder="Search Messenger"
          name="search"
          onChange={e => chat.handleChange(e)}
          value={chat.search}
        />
      </label>
      <button onClick={() => chat.handleCloseModel({ type: "serach" })}>
        Done
      </button>
    </div>
  </div>
);

export default observer(ModelSearchCaht);
