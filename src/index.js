import React, { Component } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import addons from "@storybook/addons";

const extractOpts = { filterProps: ["storydoc"] };

function extractJsx(story) {
  const dugJsx = digJsx(story);
  if (dugJsx) {
    return reactElementToJSXString(dugJsx, extractOpts);
  }
}

function digJsx(node) {
    if(node.props.storydoc){
        return node;
    } else if(React.Children.count(node)){
        const children = React.Children.toArray(node.props.children);
        for(let child of children){
            if(child.props){
                let node = digJsx(child);
                if(node){
                    return node;
                }
            }
        }
    } else {
        return null;
    }
}

export default function addWithDocumentation(kind, storyFunc, options = {}) {
  return this.add(kind, context => {
    const story = storyFunc(context);
    if (React.isValidElement(options)) {
      options = { target: options };
    }
    options = Object.assign({}, { usage: true }, options);
    if (options.target) {
      let json = options.target.__docgenInfo;
      json.displayName = options.target.name;
      if (options.usage) {
        json.jsx = extractJsx(story);
      }
      addons.getChannel().emit("storybook/livedocs/show", {
        json
      });
    }
    return story;
  });
}
