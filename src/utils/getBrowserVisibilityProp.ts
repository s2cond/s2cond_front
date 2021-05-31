export const getBrowserVisibilityProp = () => {
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return 'visibilitychange';
  } else if (typeof (document as any).msHidden !== 'undefined') {
    return 'msvisibilitychange';
  } else if (typeof (document as any).webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }
};

export const getBrowserDocumentHiddenProp = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } else if (typeof (document as any).msHidden !== 'undefined') {
    return 'msHidden';
  } else if (typeof (document as any).webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }
  return 'hidden';
};

export const getIsDocumentHidden = () => {
  return !(document as any)[getBrowserDocumentHiddenProp()];
};
