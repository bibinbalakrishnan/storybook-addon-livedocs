import React from "react";
import addons from "@storybook/addons";
import LiveDocsPanel from "./LiveDocsPanel";

addons.register("storybook/livedocs", api => {
  addons.addPanel("storybook/livedocs/show", {
    title: "LiveDocs",
    render: () => {
      <LiveDocsPanel channel={addons.getChannel()} onStory={api.onStory} />;
    }
  });
});
