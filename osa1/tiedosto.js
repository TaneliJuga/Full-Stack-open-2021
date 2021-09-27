let math = {
    'factit': function factorial(n) {
      console.log(n)
      if (n <= 1) {
        return 1;
      }
      return n * factorial(n - 1);
    }
  };
  
  math.factit(3) //3;2;1;