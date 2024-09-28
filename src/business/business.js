class Business {
  constructor(
    name = '',
    value = '',
    haveCompetitor = false,
    haveLongValue = false,
    youAcceptThisValue = false,
  ) {
    this.name = name;
    this.value = value;
    this.haveCompetitor = haveCompetitor;
    this.haveLongValue = haveLongValue;
    this.youAcceptThisValue = youAcceptThisValue;
  }
}

export default Business;
