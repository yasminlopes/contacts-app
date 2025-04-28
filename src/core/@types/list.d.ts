interface ListColumn<T = any> {
  label?: string;
  render: (item: T) => React.ReactNode;
}


