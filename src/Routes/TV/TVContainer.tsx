import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

type IAppState = {
  topRated: any;
  popular: any;
  airingToday: any;
  loading: boolean;
  error: any;
};

export default class App extends React.Component<{}, IAppState> {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      this.setState({
        topRated,
        popular,
        airingToday,
      });
    } catch {
      this.setState({
        error: "Can't find TV infomation",
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  public render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    );
  }
}
