<?php

namespace App\Form;

use App\Entity\SportEvent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SportEventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('maxMembers')
            ->add('date', TextType::class)
            ->add('creator')
            ->add('sportType')
            ->add('sportVenue')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SportEvent::class,
            'csrf_protection' => false,
        ]);
    }
}
