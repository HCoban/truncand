interface IOptions {
  appendRemainingCount?: boolean;
  descriptorPlural?: string;
  descriptorSingular?: string;
  oxfordComma?: boolean;
  useAnd?: boolean;
}

const defaultOptions: IOptions = {
  appendRemainingCount: true,
  descriptorPlural: 'more',
  descriptorSingular: 'more',
  oxfordComma: false,
  useAnd: true,
};

const truncand = (list: string[], limit: number, options?: IOptions) => {
  const { useAnd, oxfordComma, appendRemainingCount, descriptorSingular, descriptorPlural } = {
    ...defaultOptions,
    ...options,
  };
  const finalSeperator = useAnd ? `${oxfordComma && list.length > 2 ? ',' : ''} and ` : ', ';
  const remainingCount = list.length - limit;
  const descriptor = remainingCount > 1 ? descriptorPlural : descriptorSingular;

  if (limit === 0) {
    return '';
  }

  if (list.length < 2) {
    return list.join('');
  }

  if (limit === 1 && !appendRemainingCount) {
    return list[0];
  }

  if (list.length === 2) {
    return list.join(finalSeperator);
  }

  const left =
    list.length > limit
      ? list.slice(0, limit - (appendRemainingCount ? 0 : 1)).join(', ')
      : list.slice(0, list.length - 1).join(', ');

  const right =
    list.length > limit && appendRemainingCount
      ? `${remainingCount} ${descriptor}`
      : appendRemainingCount
      ? list[list.length - 1]
      : list[limit - 1];

  if (!right) {
    return left;
  }

  return `${left}${finalSeperator}${right}`;
};

export default truncand;
