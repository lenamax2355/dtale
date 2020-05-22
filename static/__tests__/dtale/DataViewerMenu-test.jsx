import { mount } from "enzyme";
import _ from "lodash";
import React from "react";

import { expect, it } from "@jest/globals";

import { ReactDataViewerMenu as DataViewerMenu } from "../../dtale/menu/DataViewerMenu";
import { buildInnerHTML } from "../test-utils";

describe("DataViewerMenu tests", () => {
  it("DataViewerMenu: render", () => {
    buildInnerHTML();
    const props = {
      openChart: _.noop,
      propagateState: _.noop,
      menuOpen: true,
      selectedCols: [],
      sortInfo: [],
      columns: [],
      hideShutdown: false,
      iframe: false,
      dataId: "1",
    };
    const result = mount(<DataViewerMenu {...props} />, {
      attachTo: document.getElementById("content"),
    });
    expect(result.find("ul li span.toggler-action").last().text()).toBe("Shutdown");
  });

  it("DataViewerMenu: hide_shutdown == True", () => {
    buildInnerHTML({ settings: "", hideShutdown: "True" });
    const props = {
      openChart: _.noop,
      propagateState: _.noop,
      menuOpen: true,
      selectedCols: [],
      sortInfo: [],
      columns: [],
      hideShutdown: true,
      iframe: false,
      dataId: "1",
    };
    const result = mount(<DataViewerMenu {...props} />, {
      attachTo: document.getElementById("content"),
    });
    expect(
      result
        .find("ul li span.toggler-action")
        .findWhere(b => _.includes(b.text(), "Instances"))
        .first()
        .text()
    ).toBe("Instances 1");
  });

  it("DataViewerMenu: processes == 2", () => {
    buildInnerHTML({ settings: "", hideShutdown: "True", processes: 2 });
    const props = {
      openChart: _.noop,
      propagateState: _.noop,
      menuOpen: true,
      selectedCols: [],
      sortInfo: [],
      columns: [],
      hideShutdown: true,
      iframe: false,
      dataId: "1",
    };
    const result = mount(<DataViewerMenu {...props} />, {
      attachTo: document.getElementById("content"),
    });
    expect(
      result
        .find("ul li span.toggler-action")
        .findWhere(b => _.includes(b.text(), "Instances"))
        .first()
        .text()
    ).toBe("Instances 2");
  });
});
