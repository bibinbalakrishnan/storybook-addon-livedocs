import React, { Component } from "react";
import Markdown from "react-markdown";
import generateMarkdown from "./generateMarkdown";

export default class LiveDocsPanel extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      json: {}
    };
    this.props.channel.on("storybook/livedocs/show", ({ json }) => {
      this.setState({ json });
    });
  }

  componentDidMount() {
    const { onStory } = this.props;
    this.stopListeningOnStory = onStory(() => {
      this.setState({
        json: {}
      });
    });
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
  }

  render() {
    const { json } = this.state;
    return json.description
      ? <Markdown source={generateMarkdown(json)} />
      : <div style={{ margin: "20px" }}>No documentation available</div>;
  }
}
