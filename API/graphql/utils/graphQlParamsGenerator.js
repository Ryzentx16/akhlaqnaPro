const GraphQlParamsGenerator = (params) => {
  const paramDefs = [];
  const paramBindings = [];

  for (const [key, value] of Object.entries(params)) {
    const paramDef = `$${key}: ${
      typeof value === "number" ? "Int" : "String"
    }!`;
    const paramBinding = `${key}: $${key}`;

    paramDefs.push(paramDef);
    paramBindings.push(paramBinding);
  }

  const paramDefsString = paramDefs.join(", ");
  const paramBindingsString = paramBindings.join(", ");

  return { paramDefsString, paramBindingsString };
};

export default GraphQlParamsGenerator;
