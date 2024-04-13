import { Text, Button } from '@chakra-ui/react';
import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

const ButtonComponent: FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <Button
      mt={4}
      w={'100%'}
      onClick={restProps.onClick}
      isDisabled={restProps.disabled}
      _disabled={{ opacity: 0.25, cursor: 'not-allowed' }}
      colorScheme='teal'
      variant='outline'
    >
      <Text as='span' color='teal.500'>
        {restProps.buttonName}
      </Text>
    </Button>
  );
};

export default ButtonComponent;
