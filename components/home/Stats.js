import Container from '../Container';

export default function Stats() {
  const stats = [
    { value: '10K+', label: 'Applications Sent' },
    { value: '2.5K+', label: 'Happy Users' },
    { value: '5x', label: 'Faster Job Search' },
    { value: '87%', label: 'Success Rate' }
  ];

  return (
    <section className="py-16 md:py-20 bg-linear-to-br from-orange-500 to-rose-500">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-orange-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

