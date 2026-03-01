import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Panel = styled.div<{ flex: number }>`
    flex: ${(p) => p.flex}; // Accessing the flex prop dynamically
`;

type SplitScreenProps = {
    leftWidth?: number;
    rightWidth?: number;
    children: [React.ReactNode, React.ReactNode];
}

const SplitScreen = ({ children, leftWidth = 1, rightWidth = 1 }: SplitScreenProps) => {
    const [left, right] = children;
    return (
        <Container>
            <Panel flex={leftWidth}>{left}</Panel>
            <Panel flex={rightWidth}>{right}</Panel>
        </Container>
    )
}

export default SplitScreen;