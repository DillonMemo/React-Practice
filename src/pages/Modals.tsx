/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import { useState, useCallback } from 'react';

import Colors from '../utils/colors';

/** Modal Component */
export interface ModalProps {
  isVisible: boolean;
  effect: 'fadeInUp';
  width: string;
  height: string;
  emotionCss?: SerializedStyles;
  onClickAway?: (e: React.MouseEvent<unknown>) => void;
}

const Modal: React.FC<ModalProps> = ({
  isVisible = false,
  effect = 'fadeInUp',
  width,
  height,
  emotionCss,
  onClickAway,
  children,
}) => {
  const ModalStyle: Modal = {
    fadeInUp: {
      mask: [
        css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10001;
        `,
      ],
      maskHidden: [
        css`
          display: none;
        `,
      ],
      container: [
        css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        `,
      ],
      containerHidden: [
        css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: -1;
        `,
      ],
      panel: [
        css`
          display: flex;
          justify-content: center;
          background-color: ${Colors.default.background};
          border-radius: 5px;
          box-sizing: border-box;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: translate3d(0, 0, 0);
          transition: transform 0.5s cubic-bezier(0, 0, 0.25, 1),
            opacity 0.5s cubic-bezier(0, 0, 0.25, 1);
          z-index: 10002;
          width: ${width ? `${width}px` : 0};
          height: ${height ? `${height}px` : 0};
        `,
        emotionCss ? emotionCss : css``,
      ],
      panelHidden: [
        css`
          transform: translate3d(0, 100px, 0);
          opacity: 0;
          z-index: -1;
          height: 0;
          width: 0;
          overflow: hidden;
        `,
      ],
    },
  };

  return (
    <div>
      <div css={isVisible ? [ModalStyle[effect].container] : [ModalStyle[effect].containerHidden]}>
        <div css={isVisible ? [ModalStyle[effect].panel] : [ModalStyle[effect].panelHidden]}>
          {children}
        </div>
        <div
          css={isVisible ? [ModalStyle[effect].mask] : [ModalStyle[effect].maskHidden]}
          onClick={onClickAway ? onClickAway : undefined}
        />
      </div>
    </div>
  );
};

export interface ModalsProps {}

const Modals: React.FC<ModalsProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleOpenModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => setIsVisible(true),
    [],
  );

  const handleCloseModal = useCallback(
    (e: React.MouseEvent<unknown>): void => setIsVisible(false),
    [],
  );

  return (
    <div css={ModalsWrapper}>
      <h2>Modals</h2>
      <div css={ButtonContainer}>
        <button type="button" css={Button} onClick={handleOpenModal}>
          Show Modal
        </button>
      </div>
      <Modal
        isVisible={isVisible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={handleCloseModal}
      >
        <div>
          <h1>Modal Header</h1>
          <p>Modal Body</p>
          <button type="button" css={Button} onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

/** styles */
const ModalsWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
`;
const ButtonContainer = css`
  margin: 1rem 0;
`;
const Button = css`
  border: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  background: ${Colors.default.default};

  width: 10rem;
  height: 2rem;

  :hover {
    background: ${Colors.default.accent6};
  }

  :active {
    background: ${Colors.default.accent8};
  }
`;

/** types */
type Modal = {
  fadeInUp: Fade;
};
type Fade = {
  [key in
    | 'mask'
    | 'maskHidden'
    | 'container'
    | 'containerHidden'
    | 'panel'
    | 'panelHidden']: SerializedStyles[];
};

export default Modals;
