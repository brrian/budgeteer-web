type Rule = keyof typeof validate;

const validate = {
  required: {
    message: 'The :attribute is required',
    test(input: any) {
      switch (typeof input) {
        case 'string':
          return input.length > 0;
        case 'number':
          return true;
        default:
          return Boolean(input);
      }
    },
  },
  numeric: {
    message: 'The :attribute must be a number',
    test(input: any) {
      return typeof input === 'number' && !isNaN(input);
    },
  },
  max: {
    message: 'The :attribute must be less than :value[0]',
    test(input: any, [max]: any[]) {
      return Number(input) < Number(max);
    },
  },
};

export default (
  data: { [key: string]: any },
  ruleSet: { [key: string]: string }
) => {
  const errors: { [key: string]: string } = {};
  let hasErrors = false;

  Object.keys(ruleSet).forEach(name => {
    const rules = ruleSet[name].split('|').map(ruleWithArgs => {
      const [rule, ...args] = ruleWithArgs.split(':');
      return { rule, args } as { rule: Rule; args: any[] };
    });

    const failedRule = rules.find(({ rule, args }) => {
      if (rule in validate === false) {
        throw new Error(`Invalid rule "${rule}"`);
      }

      return !validate[rule as Rule].test(data[name], args);
    });

    if (failedRule) {
      hasErrors = true;
      const { message } = validate[failedRule.rule];
      errors[name] = message
        .replace(':attribute', name)
        .replace(/:value\[(\d+)\]/g, (match, value) => failedRule.args[value]);
    }
  });

  return { errors, hasErrors };
};
