const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Error ${JSON.stringify(value)}`
    )
  }

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = (props: {name: string}) => {
    return <h1>{props.name}</h1>
  }

  interface ContentProps {
    name: string,
    exerciseCount: number
  }

  const Part = (props: {parts: CoursePart[]}) => {
    return (
      <div>
        {props.parts.map((part) => {
          switch (part.kind) {
            case "basic":
              return (
                <div>
                  <Content name={part.name} exerciseCount={part.exerciseCount} />
                  <p>{part.description}</p>
                </div>
              )
            case "group":
              return (
                <div>
                  <Content name={part.name} exerciseCount={part.exerciseCount} />
                  <p>project exercises {part.groupProjectCount}</p>
                </div>
              )
            case "background":
              return (
                <div>
                  <Content name={part.name} exerciseCount={part.exerciseCount} />
                  <p>{part.description}</p>
                  <p>submit to {part.backgroundMaterial}</p>
                </div>
              )
            case "special":
              return (
                <div>
                  <Content name={part.name} exerciseCount={part.exerciseCount} />
                  <p>{part.description}</p>
                  <p>required skills: {part.requirements.join(", ")}</p>
                </div>
              )
            default:
              return assertNever(part)
          }
        })}
      </div>
    )
  }

  const Content = (props: ContentProps) => {
    return <h3>{props.name} {props.exerciseCount}</h3>
  }

  const Total = (props: {total: number}) => {
    return <h2>Number of exercises {props.total}</h2>
  }


  return (
    <div>
      <Header name={courseName} />
      <Part parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;