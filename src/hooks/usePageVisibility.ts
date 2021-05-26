import { useEffect, useState } from 'react';
import {
  getIsDocumentHidden,
  getBrowserVisibilityProp,
} from '../utils/getBrowserVisibilityProp';

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    const visChange = getBrowserVisibilityProp();

    (document as any).addEventListener(visChange, onVisChange, false);

    return () => {
      (document as any).removeEventListener(visChange, onVisChange);
    };
  });
  return isVisible;
};

export default usePageVisibility;
