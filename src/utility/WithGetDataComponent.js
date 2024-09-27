const WithGetDataComponent = ({WrappedComponent, data, setData, url}) => {
  function WithDataFetching(props) {
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => setData(data));
    }, [url]);

    return <WrappedComponent {...props} data={data} />;
  }
  return WithDataFetching;
};

export default WithGetDataComponent;
