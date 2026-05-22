import styled from 'styled-components';


export const VersionContainer = styled.div`
    position: absolute;
    top: 16px;
    left: 10px;
    display: flex;
    justify-content: left;
    min-width: 360px;
    pointer-events: none;
    gap: 8px;

    z-index: 20;
`;

export const VersionSection = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(68, 83, 130, 0.25);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04),
    0 6px 16px -4px rgba(0, 0, 0, 0.12),
    0 12px 28px -8px rgba(0, 0, 0, 0.08);
  column-gap: 10px;
  height: 40px;
  padding: 0 4px;
  pointer-events: auto;
`;


export const ToolContainer = styled.div`
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: left;
  min-width: 360px;
  pointer-events: none;
  gap: 8px;

  z-index: 20;
`;

export const ToolSection = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(68, 83, 130, 0.25);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04),
    0 6px 16px -4px rgba(0, 0, 0, 0.12),
    0 12px 28px -8px rgba(0, 0, 0, 0.08);
  column-gap: 10px;
  height: 40px;
  padding: 0 4px;
  pointer-events: auto;
`;

export const SelectZoom = styled.span`
  padding: 2px;
  border-radius: 8px;
  border: 1px solid rgba(68, 83, 130, 0.25);
  font-size: 12px;
  width: 40px;
`;

export const MinimapContainer = styled.div`
  position: absolute;
  bottom: 60px;
  width: 198px;
`;
