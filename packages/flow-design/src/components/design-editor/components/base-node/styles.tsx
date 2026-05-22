import { InfoCircleOutlined } from "@ant-design/icons";
import styled from 'styled-components';

// 使用样式组件 + 动态 props
interface BaseNodeStyleProps {
    primaryColor?: string;
}

export const BaseNodeStyle = styled.div<BaseNodeStyleProps>`
    align-items: flex-start;
    background-color: #fff;
    border: 1px solid rgba(6, 7, 9, 0.1);
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04),
        0 4px 10px -2px rgba(0, 0, 0, 0.08),
        0 10px 24px -6px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 260px;
    cursor: default;
    transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06),
            0 8px 16px -2px rgba(0, 0, 0, 0.12),
            0 16px 32px -8px rgba(0, 0, 0, 0.1);
    }

    &.activated {
        border: 1px solid ${props => props.primaryColor || '#82a7fc'};
        box-shadow: 0 0 0 3px ${props => (props.primaryColor ? `${props.primaryColor}29` : 'rgba(130, 167, 252, 0.16)')},
            0 4px 12px -2px rgba(0, 0, 0, 0.1),
            0 14px 30px -8px rgba(0, 0, 0, 0.08);
    }
`;

export const ErrorIcon = () => (
  <InfoCircleOutlined
    style={{
      position: 'absolute',
      color: 'red',
      left: -6,
      top: -6,
      zIndex: 1,
      background: 'white',
      borderRadius: 8,
    }}
  />
);
