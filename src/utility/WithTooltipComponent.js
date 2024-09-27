const WithTooltipComponent = ({WrappedComponent, text}) => {
  function withTooltip(WrappedComponent) {
    function WithTooltip(props) {
      return (
        <View>
          <Tooltip />
          <WrappedComponent {...props} />
        </View>
      );
    }
    return WithTooltip;
  }
};

export default WithTooltipComponent;
