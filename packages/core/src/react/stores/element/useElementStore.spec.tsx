import React from 'react';

import type { TElement } from '@sewell_stephens/slate';

import { act, render } from '@testing-library/react';

import { Late } from '../../components';
import { createLateEditor } from '../../editor';
import { useElement } from './useElement';
import { ElementProvider } from './useElementStore';

describe('ElementProvider', () => {
  const LateWrapper = ({ children }: { children: React.ReactNode }) => {
    const editor = createLateEditor();

    return <Late editor={editor}>{children}</Late>;
  };

  interface TNameElement extends TElement {
    name: string;
    type: 'name';
  }

  interface TAgeElement extends TElement {
    age: number;
    type: 'age';
  }

  const makeNameElement = (name: string): TNameElement => ({
    children: [],
    name,
    type: 'name',
  });

  const makeAgeElement = (age: number): TAgeElement => ({
    age,
    children: [],
    type: 'age',
  });

  const NameElementProvider = ({
    children,
    name,
  }: {
    children: React.ReactNode;
    name: string;
  }) => {
    const element = React.useMemo(() => makeNameElement(name), [name]);

    return (
      <ElementProvider element={element} scope="name">
        {children}
      </ElementProvider>
    );
  };

  const AgeElementProvider = ({
    age,
    children,
  }: {
    age: number;
    children: React.ReactNode;
  }) => {
    const element = React.useMemo(() => makeAgeElement(age), [age]);

    return (
      <ElementProvider element={element} scope="age">
        {children}
      </ElementProvider>
    );
  };

  const UpdatingAgeElementProvider = ({
    buttonLabel,
    children,
    increment,
    initialAge,
  }: {
    buttonLabel: string;
    children: React.ReactNode;
    increment: number;
    initialAge: number;
  }) => {
    const [age, setAge] = React.useState(initialAge);

    return (
      <AgeElementProvider age={age}>
        <button onClick={() => setAge(age + increment)} type="button">
          {buttonLabel}
        </button>
        {children}
      </AgeElementProvider>
    );
  };

  interface ConsumerProps {
    label?: string;
  }

  const NameElementConsumer = ({ label = '' }: ConsumerProps) => {
    const element = useElement<TNameElement>('name');

    return <div>{label + element.name}</div>;
  };

  const AgeElementConsumer = ({ label = '' }: ConsumerProps) => {
    const element = useElement<TAgeElement>('age');

    return <div>{label + element.age}</div>;
  };

  const TypeConsumer = ({
    label = '',
    type,
  }: { type?: 'age' | 'name' } & ConsumerProps) => {
    const element = useElement(type);

    return <div>{label + element.type}</div>;
  };

  const JsonConsumer = ({
    label = '',
    type,
  }: { type?: 'age' | 'name' } & ConsumerProps) => {
    const element = useElement(type);

    return <div>{label + JSON.stringify(element)}</div>;
  };

  it('returns the first ancestor matching the element type', () => {
    const { getByText } = render(
      <LateWrapper>
        <NameElementProvider name="John">
          <AgeElementProvider age={20}>
            <NameElementProvider name="Jane">
              <AgeElementProvider age={30}>
                <NameElementConsumer label="Name: " />
                <AgeElementConsumer label="Age: " />
                <TypeConsumer label="Type: " />
              </AgeElementProvider>
            </NameElementProvider>
          </AgeElementProvider>
        </NameElementProvider>
      </LateWrapper>
    );

    expect(getByText('Name: Jane')).toBeInTheDocument();
    expect(getByText('Age: 30')).toBeInTheDocument();
    expect(getByText('Type: age')).toBeInTheDocument();
  });

  it('returns the first ancestor of any type if given type does not match', () => {
    const { getByText } = render(
      <LateWrapper>
        <NameElementProvider name="John">
          <NameElementProvider name="Jane">
            <TypeConsumer label="Type: " type="age" />
          </NameElementProvider>
        </NameElementProvider>
      </LateWrapper>
    );

    expect(getByText('Type: name')).toBeInTheDocument();
  });

  it('propagates updated elements to consumers', () => {
    const { getByText } = render(
      <LateWrapper>
        <UpdatingAgeElementProvider
          buttonLabel="updateAge1"
          increment={10}
          initialAge={20}
        >
          <AgeElementConsumer label="Age 1: " />
          <UpdatingAgeElementProvider
            buttonLabel="updateAge2"
            increment={10}
            initialAge={140}
          >
            <AgeElementConsumer label="Age 2: " />
          </UpdatingAgeElementProvider>
        </UpdatingAgeElementProvider>
      </LateWrapper>
    );

    expect(getByText('Age 1: 20')).toBeInTheDocument();
    expect(getByText('Age 2: 140')).toBeInTheDocument();

    act(() => getByText('updateAge1').click());

    expect(getByText('Age 1: 30')).toBeInTheDocument();
    expect(getByText('Age 2: 140')).toBeInTheDocument();

    act(() => getByText('updateAge2').click());

    expect(getByText('Age 1: 30')).toBeInTheDocument();
    expect(getByText('Age 2: 150')).toBeInTheDocument();

    act(() => getByText('updateAge1').click());

    expect(getByText('Age 1: 40')).toBeInTheDocument();
    expect(getByText('Age 2: 150')).toBeInTheDocument();
  });

  it('returns empty object if no ancestor exists', () => {
    const { getByText } = render(
      <LateWrapper>
        <JsonConsumer />
      </LateWrapper>
    );
    expect(getByText('{}')).toBeInTheDocument();
  });
});
