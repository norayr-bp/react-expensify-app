const add = (a,b) => a+ b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('should add two numbers', () => {
  const result = add(3,4);

  expect(result).toBe(7);
});

test('should generate greeting for name', () => {
  const result = generateGreeting('Noro');

  expect(result).toBe(`Hello Noro!`);
});

test('should generate greeting for anonymous', () => {
  const result = generateGreeting();

  expect(result).toBe(`Hello Anonymous!`);
})

