import React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "../../api";

type HomeState = {
  nowPlaying?: any;
  upcoming?: any;
  popular?: any;
  error: string;
  loading: boolean;
};

export default class extends React.Component {
  state: HomeState = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: "",
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movie infomation",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
