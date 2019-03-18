import { useEffect } from 'react';

export default (selector: string) =>
  useEffect(() => {
    const input = document.querySelector<HTMLElement>(selector);

    if (input) {
      input.focus();
    }
  }, []);
