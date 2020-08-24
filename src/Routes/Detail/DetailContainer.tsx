import React from "react";
import DetailPresenter from "./DetailPresenter";
import { RouteComponentProps } from "react-router-dom";
import { movieApi, tvApi } from "../../api";

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

type DetailState = {
  result?: any;
  error?: string;
  loading: boolean;
  isMovie: boolean;
};

export default class extends React.Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: "",
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({
        error: "Can't find anything",
      });
    } finally {
      this.setState({ result });
      this.setState({ loading: false });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
