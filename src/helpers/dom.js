import store from 'helpers/store';

const setColorScheme = async (nextColorScheme) => {
  return new Promise((resolve) => {
    const onTransitionEnd = () => {
      document.body.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    };

    if (!document.body.style.transition) {
      document.body.style.transition = `
        background calc(var(--motion-step) * 30) linear,
        color calc(var(--motion-step) * 30) linear
      `;
    }

    if (store.isExistingColorScheme(nextColorScheme)) {
      resolve();
    } else {
      document.body.addEventListener('transitionend', onTransitionEnd);

      document.body.style.setProperty(
        '--color-scheme-background',
        nextColorScheme.background,
      );
      document.body.style.setProperty(
        '--color-scheme-foreground',
        nextColorScheme.foreground,
      );
    }
  });
};

const setTitle = (nextTitle) => {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');

  document.title = nextTitle;
  ogTitle.content = nextTitle;
  twitterTitle.content = nextTitle;
};

const dom = {
  setColorScheme,
  setTitle,
};

export default dom;
