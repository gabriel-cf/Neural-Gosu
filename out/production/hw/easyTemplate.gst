<%@ params( myParam: String ) %>

The content of my param is: ${myParam}

Note you can render this template from a class or program
simply by calling one of its render methods:

  easyTemplate.renderToString( "wow" )